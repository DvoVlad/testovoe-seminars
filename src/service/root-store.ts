import { makeAutoObservable } from 'mobx'
import { request } from '../utils/helper';

type loadStatus = 'pending' | 'success' | 'error' | null;

export interface ISeminar {
  id: number; 
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export class RootStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  status: loadStatus = null;
  seminars: ISeminar[] = [];
  loadSeminars = () => {
    this.status = 'pending'; 
    request('/seminars').then((res) => {
      return res.json();
    }).then((data) => {
      this.seminars = data;
      this.status = 'success'
    }).catch(() => {
      this.status = 'error'
    })
  }
}