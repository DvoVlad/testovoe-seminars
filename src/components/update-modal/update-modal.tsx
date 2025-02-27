import { useEffect, FC, useState, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from "./update-modal.module.css";
import { observer } from 'mobx-react-lite';
import { ISeminar } from '../../service/root-store';
import { request } from '../../utils/helper';
import { useStore } from '../../service/root-store-context';

const modalRoot = document.getElementById("react-modals")!; 

interface Props {
  onClose: () => void,
  item: ISeminar
}

const UpdateModal: FC<Props> = observer(({ onClose, item }) => {
  const [datas, setDatas] = useState(item);
  const [isError, setIsError] = useState(false);
  const { loadSeminars } = useStore();
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

  const onChangeInput = (name: string, value: string | number) => {
    const newData = {...datas, [name]: value};
    setDatas(newData);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = {...datas};
    /* Либо обновляем элемент либо выводим сообщение об ошибке */
    request(`/seminars/${item.id}`, { method: 'PUT', body: JSON.stringify(result) })
    .catch((e) => {
      setIsError(true);
      throw e;
    })
    .then(loadSeminars)
    .then(onClose);
  };

  return(
    createPortal(
      <>
        <ModalOverlay onClick={onClose}/>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose} type="button">X</button>
          <h2 className={styles.title}>Редактирование</h2>
          <form className={styles.form} onSubmit={onSubmit}>
            {isError && <p className='error'>Ошибка обновления</p>}
            <label className={styles.titleLabel} htmlFor="date">Дата</label><input id="date" className={styles.inputs} type="text" name='date' value={datas.date} onChange={(e) => onChangeInput(e.target.name, e.target.value)} />
            <label className={styles.titleLabel} htmlFor="time">Время</label><input id="time" className={styles.inputs} type="text" name='time' value={datas.time} onChange={(e) => onChangeInput(e.target.name, e.target.value)} />
            <label className={styles.titleLabel} htmlFor="title">Название</label><input id="title" className={styles.inputs} type="text" name='title' value={datas.title} onChange={(e) => onChangeInput(e.target.name, e.target.value)} />
            <label className={styles.titleLabel} htmlFor="photo">Ссылка на фото</label><input id="photo" className={styles.inputs} type="text" name='photo' value={datas.photo} onChange={(e) => onChangeInput(e.target.name, e.target.value)} />
            <label className={styles.titleLabel} htmlFor="description">Описание</label><textarea id="description" className={styles.description} name="description" onChange={(e) => onChangeInput(e.target.name, e.target.value)} value={datas.description}></textarea>
            <div className={styles.groupButtons}>
              <button className={styles.submitButton} type='submit'>Редактировать</button>
              <button className={styles.cancel} onClick={onClose} type='button'>Отмена</button>
            </div>
          </form>
        </div>
      </>,
      modalRoot
    )
  );
});

export default UpdateModal;