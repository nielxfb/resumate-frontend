import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  Cross1Icon,
  Cross2Icon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { CheckCircle, Clock } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const payment_status = [
  {
    label: "Pending",
    value: "Pending",
    icon: Clock,
  },
  {
    label: "Paid",
    value: "Paid",
    icon: CheckCircle,
  },
  {
    label: "Failed",
    value: "Failed",
    icon: CrossCircledIcon,
  },
];

export const payment_method = [
  {
    label: "Credit Card",
    value: "Credit Card"
  },
  {
    label: "Bank Transfer",
    value: "Bank Transfer",
  },
  {
    label: "PayPal",
    value: "PayPal",
  },
  {
    label: "Debit Card",
    value: "Debit Card",
  },
];
