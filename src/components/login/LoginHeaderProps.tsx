export default interface LoginHeaderProps {
  userName: string | undefined;
  store?:LoginHeaderStore;
}

interface LoginHeaderStore {
  user:string;
  clearUser():void; 
}
