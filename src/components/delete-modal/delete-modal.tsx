import { useEffect, FC, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from "./delete-modal.module.css";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../service/root-store-context';
import { request } from '../../utils/helper';

const modalRoot = document.getElementById("react-modals")!; 

interface Props {
  onClose: () => void,
  id: number
}

const DeleteModal: FC<Props> = observer(({ onClose, id }) => {
  const { loadSeminars } = useStore();
  const [isError, setIsError] = useState(false);
  const submitDelete = () => {
    request(`/seminar/${id}`, {
      method: 'DELETE'
    })
    .catch((e) => {
      setIsError(true);
      throw e;
    })
    .then(loadSeminars)
    .then(onClose)
  }
  useEffect(() => {
    const onEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener('keydown', onEscClose);

    return () => {
      document.removeEventListener('keydown', onEscClose);
    }
  }, [onClose]);

  return(
    createPortal(
      <>
        <ModalOverlay onClick={onClose}/>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose} type="button">X</button>
          {isError && <p>ERROR</p>}
          <p className={styles.title}>Вы точно хотите удалить элемент?</p>
          <button className={styles.submitButton} onClick={submitDelete} type='button'>Да</button>
          <button className={styles.cancel} onClick={onClose} type='button'>Нет</button>
        </div>
      </>,
      modalRoot
    )
  );
});

export default DeleteModal