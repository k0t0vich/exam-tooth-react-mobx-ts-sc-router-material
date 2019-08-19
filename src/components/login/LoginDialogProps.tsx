export default interface LoginDialogProps {
  store?:LoginDialogStore;
}

interface LoginDialogStore{
  saveUser(user: string): void;
}
