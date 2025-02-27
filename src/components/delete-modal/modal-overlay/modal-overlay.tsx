import styles from "./modal-overlay.module.css"
import { FC } from "react"
import { observer } from 'mobx-react-lite';

interface Props {
  onClick: () => void
}

const ModalOverlay: FC<Props> = observer(({ onClick }) => {
  return(
    <div className={styles.overlay} onClick={onClick}>
    </div>
  )
});

export default ModalOverlay;