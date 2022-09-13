<?php

namespace App\Services;

use App\Helpers\StringHelper;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseService
{
    protected Application $app;

    protected Model|Builder $model;
    protected array $searchFields = [];
    protected array $freeSearchFields = [];
    protected array $ignoreField = ["order_by", "page", "page_size"];

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->makeModel();
    }

    abstract public function model(): string;

    public function makeModel()
    {
        $this->model = $this->app->make($this->model());
    }

    public function resetModel()
    {
        $this->makeModel();
    }

    public function getModel(): Model|Builder
    {
        return $this->model;
    }

    public function applyIndexFilter($params)
    {
        foreach ($params as $key => $value) {
            if (in_array($key, $this->ignoreField)) {
                continue;
            }
            if ($key === "query") {
                $this->applyFreeSearch($value);
            } else {
                $this->applyDetailSearch($this->searchFields, $key, $value);
            }
        }

        if (array_key_exists("order_by", $params)) {
            $tmp = explode(",", $params["order_by"]);
            foreach ($tmp as $field) {
                $direction = "asc";
                if (str_starts_with($field, "-")) {
                    $direction = "desc";
                    $field = mb_substr($field, 1);
                }
                $this->model = $this->model->orderBy($field, $direction);
            }
        } else {
            $this->model = $this->model->orderBy("id");
        }
    }

    public function applyCondition($conditions)
    {
        $this->model = $this->model->where($conditions);
    }


    public function getById($id): ?Model
    {
        return $this->model->find($id);
    }

    public function getByCondition($conditions): Collection
    {
        return $this->model->where($conditions)->get();
    }

    public function getAll(): Collection
    {
        return $this->model->get();
    }

    /**
     * @param array $relations
     * @param int|null $pageSize
     * @return array
     */
    public function getList(array $relations = [], int $pageSize = 20): array
    {
        // dd($this->model->toSql());
        $data = $this->model->with($relations)->paginate($pageSize);
        return [
            "data" => $data->items(),
            "current_page" => $data->currentPage(),
            "last_page" => $data->lastPage(),
            "per_page" => $data->perPage(),
            "total" => $data->total(),
        ];
    }






    public function create(array $params)
    {
        return $this->model->create($params);
    }

    public function applyCondition5Product($conditions)
    {
        $data = [];
        $products = $this->model->where($conditions)->paginate(5);

        foreach ($products as $product){
            array_push($data, $product->find($product->id)->load("brand"));
        }

        return [$data];
    }

    public function update(array $value, array $condition)
    {
        return $this->model->where($condition)->update($value);
    }

    public function delete(array $condition)
    {
        return $this->model->where($condition)->delete();
    }

    /**
     * Apply free search (with param query)
     * @param $keywords
     */
    private function applyFreeSearch($keywords)
    {
        if (!is_array($keywords)) {
            $keywords = [$keywords];
        }
        $normalFields = [];
        $relationFields = [];
        foreach ($this->freeSearchFields as $field) {
            $tmp = explode("|", $field);
            if (count($tmp) === 1) {
                $normalFields[] = $field;
            } else {
                $relationFields[] = ["relation" => $tmp[0], "field" => $tmp[1]];
            }
        }
        foreach ($keywords as $keyword) {
            $this->model = $this->model->where(function ($q) use ($keyword, $normalFields, $relationFields) {
                foreach ($normalFields as $field) {
                    $q->orWhere($field, "like", "%" . StringHelper::escape($keyword) . "%");
                }
                foreach ($relationFields as $relationField) {
                    $field = $relationField["field"];
                    $q->orWhereHas($relationField["relation"], function ($subQuery) use ($keyword, $field) {
                        $subQuery->where($field, "like", "%" . StringHelper::escape($keyword) . "%");
                    });
                }
            });
        }
    }

    /**
     * Apply detail search
     * @param $fieldsSearchable
     * @param $field
     * @param $value
     */
    private function applyDetailSearch($fieldsSearchable, $field, $value)
    {
        $tmp = explode(":", $field);
        $field = $tmp[0];
        $operation = "eq";
        if (count($tmp) > 1) {
            $operation = $tmp[1];
        }

        if (!in_array($field, $fieldsSearchable)) {
            return;
        }
        $this->applyField($field, $operation, $value);
    }

    /**
     * Apply query for field
     * @param $field
     * @param $operation
     * @param $value
     * @return void
     */
    private function applyField($field, $operation, $value): void
    {
        $tmp = $this->parseField($field, $operation, $value);
        switch ($operation) {
            case "like":
                $tmp["operation"] = "like";
                $tmp["value"] = "%" . StringHelper::escape($tmp["value"]) . "%";
                break;
            case "lt":
                $tmp["operation"] = "<";
                break;
            case "lte":
                $tmp["operation"] = "<=";
                break;
            case "gt":
                $tmp["operation"] = ">";
                break;
            case "gte":
                $tmp["operation"] = ">=";
                break;
            case "null":
                $tmp["operation"] = "null";
                break;
            case "not_null":
                $tmp["operation"] = "not_null";
                break;
            default:
                if (!$tmp["operation"] || $tmp["operation"] === "eq") {
                    $tmp["operation"] = "=";
                }
                break;
        }
        if ($tmp["relation"]) {
            $this->model = $this->model->whereHas($tmp["relation"], function ($q) use ($tmp) {
                if ($tmp["operation"] === "in") {
                    $q->whereIn($tmp["field"], $tmp["value"]);
                } elseif ($tmp["operation"] === "null") {
                    $q->whereNull($tmp["field"]);
                } elseif ($tmp["operation"] === "not_null") {
                    $q->whereNotNull($tmp["field"]);
                } else {
                    $q->where($tmp["field"], $tmp["operation"], $tmp["value"]);
                }
            });
        } else {
            if ($tmp["operation"] === "in") {
                $this->model = $this->model->whereIn($tmp["field"], $tmp["value"]);
            } elseif ($tmp["operation"] === "null") {
                $this->model = $this->model->whereNull($tmp["field"]);
            } elseif ($tmp["operation"] === "not_null") {
                $this->model = $this->model->whereNotNull($tmp["field"]);
            } else {
                $this->model = $this->model->where($tmp["field"], $tmp["operation"], $tmp["value"]);
            }
        }
    }

    /**
     * Parse search field
     * If field does not contain relation -> keep field, operation & value
     * If field contains relation -> need to modify
     * Ex:
     *   - field = "user|name", operation = "eq", value = "john"
     *       -> relation = "user", field = "name", operation = "eq", value = "john"
     *   - field = "user|name", operation = "eq", value = ["john", "david"]
     *       -> relation = "user", field = "name", operation = "in", value = ["john", "david"]
     *   - field = "user|name", operation = "lte", value = ["john", "david"]
     *       -> relation = "user", field = "name", operation = "lte", value = "john" (keep only first value)
     * @param $field
     * @param $operation
     * @param $value
     * @return array
     */
    private function parseField($field, $operation, $value): array
    {
        $result = $this->getFieldAndRelation($field);
        $result["value"] = $value;
        $result["operation"] = $operation;

        if (is_array($value)) {
            if ($result["operation"] === "eq") {
                $result["operation"] = "in";
            } else {
                // Invalid -> only take first value
                $result["value"] = $value[0];
            }
        }
        return $result;
    }

    /**
     * Split field (if it has relation)
     * Ex:
     *   - user|name -> relation = user, field = name
     *   - name      -> relation = null, field = name
     *
     * @param $field
     * @return array
     */
    private function getFieldAndRelation($field): array
    {
        $tmp = explode("|", $field);
        if (count($tmp) === 1) {
            return ["relation" => null, "field" => $field];
        } else {
            return ["relation" => $tmp[0], "field" => $tmp[1]];
        }
    }
}
