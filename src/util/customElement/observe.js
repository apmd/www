import { publish } from "../message/publish";

export function observe(target) {
  publish('observe', target)
}