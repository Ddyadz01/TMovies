import styles from "./film-modal.module.scss";
import { X } from "lucide-react";
import { useMovieStore } from "../../store/store.js";

export const ModalHeader = ({ closeHandler }) => {
  const { currentMovie } = useMovieStore((state) => state);
  return (
    <div className={styles["film--modal__header"]}>
      <div
        className={styles["film--modal__header--close"]}
        onClick={closeHandler}
      >
        <X />
      </div>
    </div>
  );
};
