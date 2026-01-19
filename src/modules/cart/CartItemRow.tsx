import { Button } from "../../shared/ui/Button";
import type { CartItem } from "./cartStore";

type Props = {
  item: CartItem;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
};

export function CartItemRow({ item, inc, dec, remove }: Props) {
  return (
    <li>
      {item.product.name} x {item.qty}
      <Button onClick={() => dec(item.product._id)}>-</Button>
      <Button onClick={() => inc(item.product._id)}>+</Button>
      <Button onClick={() => remove(item.product._id)}>remove</Button>
    </li>
  );
}
