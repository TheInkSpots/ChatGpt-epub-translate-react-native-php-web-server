import React, { useContext, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ParamsExampleMethodName } from '@typings/requests';

import { getuserDB } from '@services/api';

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
  LoginButton,
  LoadingIndicator,
  TitleText,
  BackSvg,
  SubTitleText,
  NoAccountText,
  LoginText,
} from './styles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

const Login = () => {
  const themeContext = useContext(ThemeContext);
  const { navigate, goBack } = useNavigation();
  const { saveUser } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoginFailed, setLoginFailed] = useState<boolean>(false);
  const [form] = useState<FormInputs>({
    username: '',
    password: '',
  });

  const { validationSchema } = useValidationSchema();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<FormInputs> = async (payload) => {
    const params: any = {
      username: payload.username,
      password: payload.password,
    };
    console.log('try login: ', params);
    setLoading(true);
    await getuserDB(
      `/api/user/?$filter=username [eq] '${params.username}' [and] password [eq] '${params.password}'`,
    )
      .then((result) => {
        console.log('login record count: ', result.data.length);
        if (result.data.length > 0) {
          const uuid = result.data[0].uuid;
          console.log('the uuid is: ', uuid);
          saveUser(
            {
              accessToken: '4c0393ae35e1.4fb787d.564f2d02eba0e.3c3237aba0944c0', //fake
              idToken: uuid,
              uuid: uuid,
              username: params.username,
            },
            false,
            uuid,
          );
          //navigate('Register', { uuid });
        } else {
          console.log('logib failed');
          //alert('failed login');
          setLoginFailed(true);
        }
      })
      .catch((error) => {
        error.alert('failed login'); //fake
      })
      .finally(() => {
        setLoading(false);
      });

    // Example use saveUser():
  };

  return (
    <ContainerView>
      <ContainerScroll>
        <TouchableOpacity onPress={() => goBack()}>
          <BackSvg />
        </TouchableOpacity>
        <TitleText>Let's log.</TitleText>
        <SubTitleText>Welcome back!</SubTitleText>
        <ContainerInput>
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
          {isLoginFailed ? (
            <NoAccountText>E-mail / password invaild ! </NoAccountText>
          ) : null}
        </ContainerInput>
        <ContainerBottomView>
          <ContainerBottomViewLink>
            <NoAccountText>Don't have an account?</NoAccountText>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <LoginText>Register</LoginText>
            </TouchableOpacity>
          </ContainerBottomViewLink>
          {isLoading && <LoadingIndicator />}
          {!isLoading && (
            <LoginButton onPress={handleSubmit(onSubmit)}>Login</LoginButton>
          )}
        </ContainerBottomView>
      </ContainerScroll>
    </ContainerView>
  );
};

export default Login;
