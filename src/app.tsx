import { FC, useEffect } from "react"
import { useStore } from "./service/root-store-context"
import { observer } from 'mobx-react-lite'
import SeminarItem from "./components/seminar-item/seminar-item";
import styles from './app.module.css'

const App: FC = observer(() => {
  /* Получаем семинары */
  const {loadSeminars, seminars, status} = useStore();
  useEffect(() => {
    loadSeminars();
  }, [loadSeminars])

  return (
    <>
      <h1 className={styles.title}>Seminars</h1>
      {status === 'error' && <p>Ошибка загрузки!</p>}
      {status === 'pending' && <p>loading...</p>}
      {status === 'success' && <ul className={styles.list}>
        { seminars.map((item) =>(
          <li key={item.id}>
            <SeminarItem item={item}/>
          </li>
          ))}
      </ul>}
    </>
  )
});

export default App
