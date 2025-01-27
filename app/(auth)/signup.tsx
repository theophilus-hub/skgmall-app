import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/formField';
import { useCallback, useMemo, useState } from 'react';
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
import Dropdown, { OptionItem } from "components/dropDown";

type FormUnit = { value: string, valid?: boolean, error: string }
type FormSelectionUnit = { value?: OptionItem, valid?: boolean, error: string }
type Form = { 
    email: FormUnit, firstname: FormUnit, lastname: FormUnit, phone: FormUnit, state: FormSelectionUnit,
    location: FormSelectionUnit, password: FormUnit, cpassword: FormUnit
}

const Signup = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register} = useGlobalContext()
    const [stateError, setStateError] = useState('');
    const { setCredentials } = useSettings();

    const [form, setForm] = useState<Form>({
        email: { value: "", error: "You must input a valid email adress" },
        firstname: { value: "", error: "First name cannot be empty" },
        lastname: { value: "", error: "Last name cannot be empty" },
        phone: { value: "", error: "You must input a valid phone number" },
        state: { error: "You must specify a State of origin" },
        location: { error: "You must specify your current location" },
        password: { value: "", error: "Password must contain one symbol, number\n and capital letter" },
        cpassword: { value: "", error: "Confirm password does not match the password provided" }
    });

    const emailValid = (value: string = form.email.value)=> validator.isEmail(value);
    const firstnameValid = (value: string = form.firstname.value)=> !validator.isEmpty(value);
    const lastnameValid = (value: string = form.lastname.value)=> !validator.isEmpty(value);
    const phoneValid = (value: string = form.phone.value)=> validator.isMobilePhone(value);
    const passwordValid = (value: string = form.password.value)=>validator.isStrongPassword(value);
    const cpasswprdValid = (value: string = form.cpassword.value)=> form.password.value === value;
    const stateValid = (value: OptionItem | undefined = form.state.value)=> value !== undefined;
    const locationValid = (value: OptionItem | undefined = form.location.value)=> value !== undefined;

    const onEmailChange = (value: string) => setForm({ ...form, email: {...form.email, value, valid: emailValid(value)} });
    const onFirstNameChange = (value: string) => setForm({ ...form, firstname: {...form.firstname, value, valid: firstnameValid(value)} });
    const onLastNameChange = (value: string) => setForm({ ...form, lastname: {...form.lastname, value, valid: lastnameValid(value)} });
    const onPhoneChange = (value: string) => setForm({ ...form, phone: {...form.phone, value, valid: phoneValid(value)} });
    const onPasswordChange = (value: string) => setForm({ ...form, password: {...form.password, value, valid: passwordValid(value)} });
    const onCPasswordChange = (value: string) => setForm({ ...form, cpassword: {...form.cpassword, value, valid: cpasswprdValid(value) } });
    const onStateChange = (value: OptionItem) => setForm({ ...form, state: {...form.state, value, valid: stateValid(value) } });
    const onLocationChange = (value: OptionItem) => setForm({ ...form, location: {...form.location, value, valid: locationValid(value) } });

    const check = () =>{
        setForm({ ...form, email: {...form.email, valid: emailValid() },
            firstname: {...form.firstname, valid: firstnameValid()},
            lastname: {...form.lastname, valid: lastnameValid() },
            phone: {...form.phone, valid: phoneValid() },
            password: {...form.password, valid: passwordValid() },
            cpassword: {...form.cpassword, valid: cpasswprdValid() },
            state: {...form.state, valid: stateValid() },
            location: {...form.location, valid: locationValid() } });

        return form.email.valid && form.firstname.valid && form.lastname.valid && form.phone.valid && form.password.valid && form.cpassword.valid && form.state.valid && form.location.valid;
    }

    const convert = (): RegistrationDetails =>{
      console.log(form)
        return { 
            email: form.email.value, firstname: form.firstname.value, lastname: form.lastname.value,
            phone: form.phone.value, password: form.password.value, location: form.location.value!.label, state: form.state.value!.label
        }
    }

    const submit = () => {
        if (check()) {
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
        }else{
            Alert.alert('notice', 'wrong input');
        }
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
                handleChange={onEmailChange}
                inputType='email'
              />
              <SignUpForm 
                placeholder='First Name'
                value={form.firstname.value}
                isValid={form.firstname.valid}
                errorMessage={form.firstname.error}
                handleChange={onFirstNameChange}
                inputType='text'
              />
              <SignUpForm 
                placeholder='Last Name'
                value={form.lastname.value}
                isValid={form.lastname.valid}
                errorMessage={form.lastname.error}
                handleChange={onLastNameChange}
                inputType='text'
              />
              <SignUpForm 
                placeholder='Phone Number'
                value={form.phone.value}
                isValid={form.phone.valid}
                errorMessage={form.phone.error}
                handleChange={onPhoneChange}
                inputType='numeric'
              />
              <SignUpForm 
                placeholder='Create Password'
                value={form.password.value}
                isValid={form.password.valid}
                errorMessage={form.password.error}
                handleChange={onPasswordChange}
                inputType= 'Password'
              />
               <SignUpForm
                placeholder='Confirm Password'
                value={form.cpassword.value}
                isValid={form.cpassword.valid}
                errorMessage={form.cpassword.error}
                handleChange={onCPasswordChange}
                inputType= 'Password'
              />
              {/* <FormSelect placeholder='Select State' handleChange={(e) => onInputChange("state", e)} valid={form.state.valid} value={ validator.isEmpty(form.state.value)? undefined : form.state.value } values={states} errorMessage='please select a state' />
              <FormSelect placeholder='Select Location' handleChange={(e) => onInputChange("location", e)} valid={form.location.valid} value={ validator.isEmpty(form.location.value)? undefined : form.location.value } values={locations(form.state.value)} errorMessage='please select a location' />
            */}
              <Dropdown
        data={states}
        onChange={onStateChange}
        placeholder="Select State"
      />

<Dropdown
        data={locations(form.state.value?.label ?? "")}
        onChange={onLocationChange}
        placeholder="Select Location"
      />
           
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
});


export default Signup