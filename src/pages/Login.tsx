import { useRef, useState } from 'react';
import { loginAPI } from '../api/api';
import { Button, ErrorText, Heading, InputField } from '../components';

// Define the HTML input element ref prop
type InputRefProp = HTMLInputElement | null;

// Define the error state interface
interface ErrorState {
    email: string;
    password: string;
    global?: string;
}

const Login = () => {
    const [errorState, setErrorState] = useState<ErrorState>({ 
        email: 'default', 
        password: 'default', 
        global: "" 
    });
    const [isDisabled, setIsDisabled] = useState(false);

    // using useRef to prevent unnecessary rerender
    const emailRef = useRef<InputRefProp>(null); 
    const passwordRef = useRef<InputRefProp>(null);

    // Validate email and password inputs
    const validateInputs = () : boolean => {
        let emailIsValid = false;
        let passwordIsValid = false;
        

        // Check if email is valid
        if(emailRef.current && (/^\w+([.-/+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))) {
            emailIsValid = true;

            // Set the email input field to default
            setErrorState(prevState => ({ ...prevState, email: "default" })); 
        } else {
            // Set the email input field to error
            setErrorState(prevState => ({ ...prevState, email: "error" })); 
        }

        // Check if password is valid
        if(passwordRef.current && passwordRef.current.value.length >= 8) {
            passwordIsValid = true;
            // Set the password input field to default
            setErrorState(prevState => ({ ...prevState, password: "default" })); 
        } else {
            // Set the password input field to error
            setErrorState(prevState => ({ ...prevState, password: "error" })); 
        }

        return emailIsValid && passwordIsValid;
    }

    // Handle submit login form
    const handleSubmitLoginForm = async () => {
        // Disable the submit button
        setIsDisabled(true);

        // Get email and password input fields
        const email = emailRef.current;
        const password = passwordRef.current;

        // If email and password are valid, send request to login API
        if(validateInputs()) {
            try{
                const response = await loginAPI(email!.value, password!.value);
                if (response.status === 200) {
                    // Set user information to local storage
                    localStorage.setItem('userInformation', JSON.stringify(response.data))
                    setErrorState(prevState => ({ ...prevState, global: "" })); 
                    window.location.reload();
                }
                else {
                    // Set error message if email or password is incorrect
                    setErrorState(prevState => ({ ...prevState, global: "Incorrect Email or Password" })); 
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catch (error) {
                setErrorState(prevState => ({ ...prevState, global: "Error, Please try again!" })); 
            }
        }

        // Enable the submit button
        setIsDisabled(false);
    }

    return (
        <div className='flex justify-center items-center h-screen flex-col gap-2 m-4'>
            <Heading text="Login" />
            <div className='flex flex-col max-w-md w-full'>
                {!!errorState.global && 
                    <ErrorText text={errorState.global ? errorState.global : ""}/>
                }
                <InputField label='Email' 
                    type='email' 
                    variant={errorState.email} 
                    reference={emailRef} 
                />
                {errorState.email === 'error' && 
                    <ErrorText text='Email is invalid'/>
                }
                <InputField label='Password' 
                    type='password' 
                    variant={errorState.password} 
                    reference={passwordRef} 
                />
                {errorState.password === 'error' && 
                    <ErrorText text='Password must be at least 8 character long'/>
                }
                <Button isDisabled={isDisabled} label="Submit" onClick={handleSubmitLoginForm} />
            </div>
        </div>
    )
}

export default Login