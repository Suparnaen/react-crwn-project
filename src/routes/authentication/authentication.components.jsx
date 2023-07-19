// import {
//     signInWithGooglePopup,
//     createUserDocumentFromAuth, signInWithGoogleRedirect
// } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';



const Authentication = () => {

    // const logGoogleUser = async () => {
    //     //const response = await signInWithGooglePopup();
    //     //console.log(response);
    //     const { user } = await signInWithGooglePopup();
    //     const setDocument = await createUserDocumentFromAuth(user);
    // }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     console.log({ user });
    // }

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;