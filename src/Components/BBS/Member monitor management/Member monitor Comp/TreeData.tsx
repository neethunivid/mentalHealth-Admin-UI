import { Grid } from "@mui/material";
import React from "react";

interface DataItem {
  date: number;
  remark_no: string;
  parent_id: number;
  remark: number;
  text: string;
  rid: number;
  title: string;
}

interface TreeNode {
  item: DataItem;
  children: TreeNode[];
}

function createNestedStructure(data: DataItem[]): TreeNode[] {
  const itemMap: { [rid: number]: TreeNode } = {};

  let minId = data[0]["rid"];
  let index = 0;
  data.map((data, __index) => {
    if (data["rid"] < minId) {
      minId = data["rid"];
      index = __index;
    }
  });
  data[index]["parent_id"] = 0;

  data.forEach((item) => {
    itemMap[item.rid] = {
      item,
      children: [],
    };
  });

  const tree: TreeNode[] = [];

  data.forEach((item) => {
    const node = itemMap[item.rid];

    if (item.parent_id === 0) {
      tree.push(itemMap[item.rid]);
    } else {
      const parent = itemMap[item.parent_id];
      parent.children.push(node);
    }
  });

  return tree;
}

const convertTimestampToDateTime = (timestamp: any) => {
  const date = new Date(timestamp);

  const year = date.getFullYear().toString().slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    date.getDay()
  ];

  return `${year}/${month}/${day} ${" "} (${dayOfWeek})${" "}${hours}:${minutes}`;
};
const TreeView = ({ value }: any) => {
  const nestedData: TreeNode[] = createNestedStructure(value);
  // ${node.item.text}
  const renderTree = (nodes: TreeNode[], level = 0): JSX.Element => (
<Grid className="black" >
  {nodes.map((node, index) => (
 <>

    <div
      key={node.item.rid}
      style={{
        paddingLeft: `${level * 15}px`,
        color: node.item.parent_id === 0 ? "red" : "black", // Change color logic for the first element
      }}
    >
      {`${node.item.parent_id === 0 ? "★" : ""}${node.item.title}  ${
        "By "
      } ${convertTimestampToDateTime(node.item.date)} ${
        " "
      } ${node.item.remark_no}`}
      {node.children.length > 0 && renderTree(node.children, level + 3)}
    </div></>
  ))}
</Grid>

  );

  return <div className="tree_box" style={{ overflow: 'auto' }}>{renderTree(nestedData)}</div>;
};

export default TreeView;
