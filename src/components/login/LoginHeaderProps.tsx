export default interface LoginHeaderProps {
  store?:LoginHeaderStore;
}

interface LoginHeaderStore {
  user:string;
  clearUser():void; 
}
