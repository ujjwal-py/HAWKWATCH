import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", size = "default", children, style, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`] as any,
        style
      ]}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, (styles as any)[`text_${variant}`]]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  default: {
    backgroundColor: '#000',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  size_default: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  size_sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  size_lg: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  size_icon: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  text_default: {
    color: '#fff',
  },
  text_destructive: {
    color: '#fff',
  },
  text_outline: {
    color: '#000',
  },
  text_secondary: {
    color: '#000',
  },
  text_ghost: {
    color: '#000',
  },
  text_link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
});