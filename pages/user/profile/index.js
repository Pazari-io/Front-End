import { useMoralis } from 'react-moralis';
import { displayUserLoginButton } from '../../../components/util/ErrorDisplays';
import ProfileForm from '../../../components/ProfileForm';



export default function Profile() {
  const { isAuthenticated, authenticate, user, Moralis } = useMoralis();
  //Better to load user here and pass it so we don't get any issue with hooks
  if (!user) {
      return displayUserLoginButton(authenticate);
  }

  return isAuthenticated && <ProfileForm user={user} Moralis={Moralis}/>
}
