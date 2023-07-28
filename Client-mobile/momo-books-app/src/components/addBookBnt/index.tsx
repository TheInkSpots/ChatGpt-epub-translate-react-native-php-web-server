// import {
//     SafeAreaView,
//     Text,
//     TouchableOpacity,
//     useWindowDimensions,
//     View,
//   } from 'react-native';
//   import Icon from 'react-native-vector-icons/AntDesign'
//   import React, { useContext, useState } from 'react';
//   import { navigate, useNavigation } from '@react-navigation/native';
//   const addBookBnt = () => {
//     const { navigate, goBack } = useNavigation();

//         return(
//             <TouchableOpacity onPress={()=>{
//                 // setEditModalOpen(true);
//                 navigate('CreateRecScreen',{uuid});
//         }} 
//         activeOpacity={0.6} 
//         style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 1 }}>
//         <Icon
//         name="pluscircle" size={52} color= {""}
//         />
//         </TouchableOpacity>
//         )
// };
// export addBookBnt;