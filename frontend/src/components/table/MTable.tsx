import { Key } from "react";
import { Table, TableProps } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import "./index.scss";

type Props<T> = { selection?: Key[]; onSelectionChange?: (keys: Key[]) => void } & TableProps<T>;

const MTable = ({ className, pagination, selection, onSelectionChange, ...props }: Props<any>) => {
    className = className || "" + " m-table";

    if (pagination) {
        pagination = { hideOnSinglePage: true, showSizeChanger: false, position: ["bottomCenter"], ...pagination };
    }

    let rowSelection: TableRowSelection<any> | undefined = undefined;
    if (onSelectionChange) {
        rowSelection = {
            selectedRowKeys: selection,
            onChange: (keys) => {
                onSelectionChange(keys);
            },
        };
    }

    return <Table className={className} pagination={pagination} rowSelection={rowSelection} {...props} />;
};

export default MTable;
