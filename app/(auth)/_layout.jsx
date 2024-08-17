import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
        <Stack.Screen
             name="login"
             options={{
               headerShown: false,}}
        />
        <Stack.Screen
             name="sign-up"
             options={{
               headerShown: false,}}
        />
    </Stack>
   
  )
}

const styles = StyleSheet.create({})