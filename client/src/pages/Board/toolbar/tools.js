import {
  MousePointer2,
  Square,
  Circle,
  Ellipsis,
  Minus,
  ArrowRight,
  Type,
  Image,
  Hand,
  CircleEllipsis
} from "lucide-react";
import { TOOLS } from "../../../utils/constants";
import EllipseIcon from "../../../assets/Icon/EllipseIcon";

export const TOOL_LIST = [
  {
    id: TOOLS.SELECT,
    icon: MousePointer2,
    label: "Select",
    key: TOOLS.SELECT
  },
  {
    id: TOOLS.RECTANGLE,
    icon: Square,
    label: "Rectangle",
    key: TOOLS.RECTANGLE
  },
  {
    id: TOOLS.CIRCLE,
    icon: Circle,
    label: "Circle",
    key: TOOLS.CIRCLE
  },
  {
    id: TOOLS.ELLIPSE,
    icon: EllipseIcon,
    label: "Ellipse",
    key: TOOLS.ELLIPSE
  },
  {
    id: TOOLS.LINE,
    icon: Minus,
    label: "Line",
    key: TOOLS.LINE
  },
  {
    id: TOOLS.ARROW,
    icon: ArrowRight,
    label: "Arrow",
    key: TOOLS.ARROW
  },
  // {
  //   id: TOOLS.TEXT,
  //   icon: Type,
  //   label: "Text",
  // },
  // {
  //   id: TOOLS.IMAGE,
  //   icon: Image,
  //   label: "Image",
  // },
  // {
  //   id: TOOLS.HAND,
  //   icon: Hand,
  //   label: "Hand",
  // },
];