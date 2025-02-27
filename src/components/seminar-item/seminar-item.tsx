import { FC, useState } from "react";
import { ISeminar } from "../../service/root-store";
import DeleteModal from "../delete-modal/delete-modal";
import UpdateModal from "../update-modal/update-modal";
import { observer } from 'mobx-react-lite'
import styles from './seminar-item.module.css'

interface Props {
  item: ISeminar
}

const SeminarItem: FC<Props> = observer(({ item }) => {
  /* У каждого семинара есть модалка для редактирования */
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const closeModalDelete = () => {
    setIsOpenDeleteModal(false);
  }
  const openModalDelete = () => {
    setIsOpenDeleteModal(true);
  }
  const closeModalEdit = () => {
    setIsOpenEditModal(false);
  }
  const openModalEdit = () => {
    setIsOpenEditModal(true);
  }
  return (
    <div className={styles.item}>
      <h2>{item.title}</h2>
      <p>Время: {item.time}</p>
      <p>Дата: {item.date}</p>
      <p>Описание: {item.description}</p>
      {item.photo && <img className={styles.image} height="250" src={item.photo} alt={item.title} />}
      <button onClick={openModalDelete} type="button">УДАЛИТЬ</button>
      <button onClick={openModalEdit} type="button">РЕДАКТИРОВАТЬ</button>
      {isOpenDeleteModal && <DeleteModal onClose={closeModalDelete} id={+item.id}/>}
      {isOpenEditModal && <UpdateModal onClose={closeModalEdit} item={item}/>}
    </div>
  )
});

export default SeminarItem;