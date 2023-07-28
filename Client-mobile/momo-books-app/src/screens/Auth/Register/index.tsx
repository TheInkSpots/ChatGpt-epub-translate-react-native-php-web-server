import React, { useContext, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ParamsExampleMethodName } from '@typings/requests';

import { addUserDB, getuserDB } from '@services/api';

import { useAuth } from '@contexts/AuthContext';

import { FormInputs, useValidationSchema } from './useValidationSchema';

import {
  ContainerBottomViewLink,
  ContainerScroll,
  Input,
  ContainerInput,
  ContainerView,
  BoxInputView,
  ContainerBottomView,
  RegisterButton,
  LoadingIndicator,
  TitleText,
  BackSvg,
  SubTitleText,
  NoAccountText,
  AlertText,
  RegisterText,
} from './styles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { v4 as uuidv4 } from 'uuid';
const Register = () => {
  const themeContext = useContext(ThemeContext);
  const { navigate, goBack } = useNavigation();
  const { saveUser } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<boolean>(false);
  const [form] = useState<FormInputs>({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { validationSchema } = useValidationSchema();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<FormInputs> = async (payload) => {
    let uuid = uuidv4();
    const params: any = {
      uuid: uuid,
      username: payload.username,
      password: payload.password,
      email: payload.username,
      phone: 12345678,
    };

    setLoading(true);
    console.log(`sql : /api/user/?$filter=username [eq] '${params.username}' `);
    await getuserDB(`/api/user/?$filter=username [eq] '${params.username}' `)
      .then((result) => {
        //console.log('got record: ', result.);
        console.log('got record count: ', result.data.length); //why length is 11?
        if (result.data.length === 0) {
          addUserDB('/api/user', params)
            .then((result2) => {
              console.log('good inserted result,', result2.data);
              if (result2.data.success.code === '200') {
                console.log('code: ', result2.data.success.code);
                saveUser(
                  {
                    accessToken:
                      '4c0393ae35e1.4fb787d.564f2d02eba0e.3c3237aba0944c0',
                    idToken: uuid,
                    uuid: uuid,
                    username: params.username,
                  },
                  false,
                );
              } else {
                console.log('failed: ', result2.data);
              }
            })
            .catch((error) => {
              error.alert('failed register'); //fake
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          console.log('username is used!');
          //errors1.alert('failed register'); //fake
          setAlert(true);
        }
      })
      .catch((error) => {
        error.alert('failed login'); //fake
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ContainerView>
      <ContainerScroll>
        <TouchableOpacity onPress={() => goBack()}>
          <BackSvg />
        </TouchableOpacity>
        <TitleText>Let's create an account.</TitleText>
        <SubTitleText>Fill in all to register.</SubTitleText>
        <ContainerInput>
          <BoxInputView>
            <Input
              testID="textInput:fullName"
              name="fullName"
              control={control}
              param={form.fullName}
              label="Full name"
              placeholder="Mick Chan"
              placeholderTextColor={themeContext.colors.terciary}
              hasError={errors?.fullName?.message ? true : false}
              errorMessage={errors?.fullName?.message}
            />
          </BoxInputView>
          <BoxInputView>
            <Input
              testID="textInput:username"
              name="username"
              control={control}
              param={form.username}
              label="E-email"
              placeholder="john@gmail.com"
              placeholderTextColor={themeContext.colors.terciary}
              hasError={errors?.username?.message ? true : false}
              errorMessage={errors?.username?.message}
            />
          </BoxInputView>
          <BoxInputView>
            <Input
              testID="textInput:password"
              name="password"
              control={control}
              isPasswordInput={true}
              param={form.password}
              label="Password"
              placeholder="*********"
              placeholderTextColor={themeContext.colors.terciary}
              hasError={errors?.password?.message ? true : false}
              errorMessage={errors?.password?.message}
            />
          </BoxInputView>
          <BoxInputView>
            <Input
              testID="textInput:confirmPassword"
              name="confirmPassword"
              control={control}
              isPasswordInput={true}
              param={form.confirmPassword}
              label="Confirm Password"
              placeholder="*********"
              placeholderTextColor={themeContext.colors.terciary}
              hasError={errors?.confirmPassword?.message ? true : false}
              errorMessage={errors?.confirmPassword?.message}
            />
          </BoxInputView>
        </ContainerInput>
        <ContainerBottomView>
          <ContainerBottomViewLink>
            <NoAccountText>Already have account?</NoAccountText>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <RegisterText>Login</RegisterText>
            </TouchableOpacity>
          </ContainerBottomViewLink>
          {isAlert && <AlertText>E-mail have been used!</AlertText>}
          {isLoading && <LoadingIndicator />}
          {!isLoading && (
            <RegisterButton onPress={handleSubmit(onSubmit)}>
              Register
            </RegisterButton>
          )}
        </ContainerBottomView>
      </ContainerScroll>
    </ContainerView>
  );
};

export default Register;
