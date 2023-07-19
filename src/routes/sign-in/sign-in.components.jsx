import {
    signInWithGooglePopup,
    createUserDocumentFromAuth, signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    const logGoogleUser = async () => {
        //const response = await signInWithGooglePopup();
        //console.log(response);
        const { user } = await signInWithGooglePopup();
        const setDocument = await createUserDocumentFromAuth(user);
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     console.log({ user });
    // }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>SignIn with Google Pop-up</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;