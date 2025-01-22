import { View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/formField';
import { useState } from 'react';
import WideButton from '../../components/wideButton';
import Eye from '../../assets/images/auth/eye-slash.png';
import Google from '../../assets/images/auth/google logo.png';
import Apple from '../../assets/images/auth/apple logo.png';
import SKG from '../../assets/SKG.png'
import {signUpWithEmail, signInWithEmail, supabase} from '../../lib/supabase'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../../context/GlobalProvider';
import { useSettings } from 'context/settingsContext';
import { RegistrationDetails } from 'context/models';
import SignUpForm from 'components/signup-form';
import validator from 'validator';
import FormSelect from 'components/form-select';
import { locations, states } from 'lib/utils';

const Signup = () => {
    const [form, setForm] = useState({
        email: { value: "", valid: true, error: "You must input a valid email adress" },
        firstname: { value: "", valid: true, error: "First name cannot be empty" },
        lastname: { value: "", valid: true, error: "Last name cannot be empty" },
        phone: { value: "", valid: true, error: "You must input a valid phone number" },
        state: { value: "", valid: true, error: "You must specify a State of origin" },
        location: { value: "", valid: true, error: "You must specify your current location" },
        password: { value: "", valid: true, error: "Password must contain one symbol, number\n and capital letter" },
        cpassword: { value: "", valid: true, error: "Confirm password does not match the password provided" }
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register} = useGlobalContext()
    const [stateError, setStateError] = useState('');
    const { setCredentials } = useSettings();

    const onInputChange = (name: string, value: string) =>{
        switch(name){
            case "email":
                setForm({ ...form, email: {...form.email, value, valid: validator.isEmail(value)} });
                break;
            case "firstname":
                setForm({ ...form, firstname: {...form.firstname, value, valid: !validator.isEmpty(value)} });
                break;
            case "lastname":
                setForm({ ...form, lastname: {...form.lastname, value, valid: !validator.isEmpty(value)} });
                break;
            case "phone":
                setForm({ ...form, phone: {...form.phone, value, valid: validator.isMobilePhone(value)} });
                break;
            case "password":
                setForm({ ...form, password: {...form.password, value, valid: validator.isStrongPassword(value)} });
                break;
            case "cpassword":
                setForm({ ...form, cpassword: {...form.cpassword, value, valid: form.password.value === value } });
                break;
            case "state":
                setForm({ ...form, state: {...form.state, value, valid: !validator.isEmpty(value) } });
                break;
            case "location":
                setForm({ ...form, location: {...form.location, value, valid: !validator.isEmpty(value) } });
                break;
        }
    }

    const check = (): boolean =>{
        const emailValid = validator.isEmail(form.email.value);
        setForm({ ...form, email: {...form.email, valid: emailValid } });

        const firstnameValid = !validator.isEmpty(form.firstname.value);
        setForm({ ...form, firstname: {...form.firstname, valid: firstnameValid} });

        const lastnameValid = !validator.isEmpty(form.lastname.value);
        setForm({ ...form, lastname: {...form.lastname, valid: lastnameValid} });
        
        const phoneValid = validator.isMobilePhone(form.phone.value);
        setForm({ ...form, phone: {...form.phone, valid: phoneValid} });

        const passwordValid = validator.isStrongPassword(form.password.value);
        setForm({ ...form, password: {...form.password, valid: passwordValid } });

        const cpasswprdValid = form.password.value === form.cpassword.value;
        setForm({ ...form, cpassword: {...form.cpassword, valid: cpasswprdValid } });

        const stateValid = !validator.isEmpty(form.state.value);
        setForm({ ...form, state: {...form.state, valid: stateValid} });

        const locationValid = !validator.isEmpty(form.location.value);
        setForm({ ...form, location: {...form.location, valid: locationValid} });

        return emailValid && firstnameValid && lastnameValid && phoneValid && passwordValid && cpasswprdValid && stateValid && locationValid;
    }

    const convert = (): RegistrationDetails =>{
        return { 
            email: form.email.value, firstname: form.firstname.value, lastname: form.lastname.value,
            phone: form.phone.value, password: form.password.value, location: form.location.value, state: form.state.value
        }
    }

    const submit = () => {
        if (!check()) {
            Alert.alert('notice', 'wrong input')
        }
        setIsSubmitting(true);

        register(convert()).then(()=>{
            setCredentials({ email: form.email.value, password: form.password.value });
            router.replace('/mall')
        }).catch((error)=>{
            setStateError(error.message);
            if ((error as Error).message === 'AuthApiError: User already registered') {
                Alert.alert('Error', 'User Already Exist')
            } else {
                Alert.alert('Error', (error as Error).message)
            }
        }).finally(()=> setIsSubmitting(false));
    }
    
    return (
        <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className='justify-center items-center w-full  px-4 mt-16'>
        <Image
          className='w-10 h-8'
                source={SKG}
              />
          <Text className='font-bold font-inter text-center text-base'>Welcome to SKG Mall {'\n'}Sign Up</Text>

         

          <View className='mt-8'>
            <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-3 justify-center items-center bg-white border border-gray my-2 py-3 px-4 w-[338px] rounded-[10px]'>
              <Image 
                source={Google} 
                />

              <Text>Sign up with Google</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-3 justify-center items-center bg-white border border-gray my-2 py-3 px-4 w-[338px] rounded-[10px]'>
              <Image 
                source={Apple}
              />
              <Text>Sign up with Apple ID</Text>
            </TouchableOpacity>
           <View className='justify-center items-center w-full  px-2 '>
          <View className='flex flex-row justify-center items-center p-4'>
            <Text className='text-sm font inter font-semibold'>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/signin')} activeOpacity={0.4} className=' ml-4 '>
              <Text className='font-semibold font-inter text-base text-primary'>Sign in</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        </View>
          <View className='flex flex-row justify-center items-center space-x-4 mx-0 my-2'>
                <View className='min-h-[1px] h-[1px] min-w-[168px] bg-black opacity-60'></View>
                <Text className='font-bold font-inter text-base'>OR</Text>
                <View className='min-h-[1px] h-[1px] min-w-[168px] bg-black opacity-60 mr-0'></View>
            </View>
          <View>
            <View style={{ gap: 10 }}>
              <SignUpForm 
                placeholder='Email'
                value={form.email.value}
                isValid={form.email.valid}
                errorMessage={form.email.error}
                handleChange={(e) => onInputChange("email", e)}
                inputType='email'
              />
              <SignUpForm 
                placeholder='First Name'
                value={form.firstname.value}
                isValid={form.firstname.valid}
                errorMessage={form.firstname.error}
                handleChange={(e) => onInputChange("firstname", e)}
                inputType='text'
              />
              <SignUpForm 
                placeholder='Last Name'
                value={form.lastname.value}
                isValid={form.lastname.valid}
                errorMessage={form.lastname.error}
                handleChange={(e) => onInputChange("lastname", e)}
                inputType='text'
              />
              <SignUpForm 
                placeholder='Phone Number'
                value={form.phone.value}
                isValid={form.phone.valid}
                errorMessage={form.phone.error}
                handleChange={(e) => onInputChange("phone", e)}
                inputType='numeric'
              />
              <SignUpForm 
                placeholder='Create Password'
                value={form.password.value}
                isValid={form.password.valid}
                errorMessage={form.password.error}
                handleChange={(e) => onInputChange("password", e)}
                inputType= 'Password'
              />
               <SignUpForm
                placeholder='Confirm Password'
                value={form.cpassword.value}
                isValid={form.cpassword.valid}
                errorMessage={form.cpassword.error}
                handleChange={(e) => onInputChange("cpassword", e)}
                inputType= 'Password'
              />
              <FormSelect placeholder='Select State' handleChange={(e) => onInputChange("state", e)} valid={form.state.valid} value={ validator.isEmpty(form.state.value)? undefined : form.state.value } values={states} errorMessage='please select a state' />
              <FormSelect placeholder='Select Location' handleChange={(e) => onInputChange("location", e)} valid={form.location.valid} value={ validator.isEmpty(form.location.value)? undefined : form.location.value } values={locations(form.state.value)} errorMessage='please select a location' />
            </View>
            <View>
              <Text>{stateError}</Text>
            </View>
            <View className='mt-2'>
              <WideButton 
                onPress={submit}
                text='Sign Up'
                bg='primary'
                color='white'
                style="font-semibold font-inter text-sm  text-center justify-center"
                isLoading = {isSubmitting}
                />

            </View>
            
          </View>
        </View>

        

        <View className='justify-center items-center w-full  px-2 mb-8 '>
         
          <View className='mx-2'>
              <Text className='font-normal font-inter text-sm text-center'>By clicking Sign up, you agree to the <Text className='text-secondary'>terms & conditions</Text> and <Text className='text-secondary'>privacy policy</Text>.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup