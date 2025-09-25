import * as React from "react";import * as React from "react";import * as React from "react";

import { TextInput, StyleSheet, TextInputProps } from "react-native";

import { TextInput, StyleSheet, TextInputProps } from "react-native";import { TextInput, StyleSheet, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {}



export const Input: React.FC<InputProps> = ({ style, ...props }) => {

  return (export interface InputProps extends TextInputProps {export interface InputProps extends TextInputProps {

    <TextInput

      style={[styles.input, style]}  className?: string;  className?: string;

      placeholderTextColor="#9ca3af"

      {...props}}}

    />

  );

};

export const Input: React.FC<InputProps> = ({ style, ...props }) => {export const Input: React.FC<InputProps> = ({ style, ...props }) => {

const styles = StyleSheet.create({

  input: {  return (  return (

    height: 40,

    borderWidth: 1,    <TextInput    <TextInput

    borderColor: '#d1d5db',

    borderRadius: 6,      style={[styles.input, style]}      style={[styles.input, style]}

    paddingHorizontal: 12,

    paddingVertical: 8,      placeholderTextColor="#9ca3af"      placeholderTextColor="#9ca3af"

    fontSize: 14,

    backgroundColor: '#fff',      {...props}      {...props}

    color: '#000',

  },    />    />

});
  );  );

};};



const styles = StyleSheet.create({const styles = StyleSheet.create({

  input: {  input: {

    height: 40,    height: 40,

    borderWidth: 1,    borderWidth: 1,

    borderColor: '#d1d5db',    borderColor: '#d1d5db',

    borderRadius: 6,    borderRadius: 6,

    paddingHorizontal: 12,    paddingHorizontal: 12,

    paddingVertical: 8,    paddingVertical: 8,

    fontSize: 14,    fontSize: 14,

    backgroundColor: '#fff',    backgroundColor: '#fff',

    color: '#000',    color: '#000',

  },  },

});});