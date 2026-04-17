import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "../../schema/auth";
import { useAuth } from "../../context/AuthContext";

export default function SignInScreen() {
    const { signIn } = useAuth();
    const [authError, setAuthError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            setAuthError(null);
            setIsSubmitting(true);
            await signIn(data.email, data.password);
        } catch (e) {
            setAuthError(e instanceof Error ? e.message : "Sign in failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.subtitle}>Welcome Back. Sign in to continue</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Email</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Enter your email"
                                    placeholderTextColor="#8E8E93"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput 
                                    placeholder="Enter your password"
                                    placeholderTextColor="#8E8E93"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        )}
                    </View>

                    {authError && <Text style={styles.errorText}>{authError}</Text>}

                    <Pressable 
                        style={[styles.button, isSubmitting && styles.buttonDisabled]} 
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <Link href="/(auth)/signup" style={styles.link}>
                        Sign Up
                    </Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0F0F10"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 32,   
    },
    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
    },
    subtitle: {
        color: "#A1A1AA",
        fontSize: 15,
        lineHeight: 22,
    },
    form: {
        marginBottom: 24,
    },
    fieldGroup: {
        marginBottom: 18,
    },
    label: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#1A1A1D",
        borderWidth: 1,
        borderColor: "#2A2A2E",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: "#FFFFFF",
        fontSize: 15,
    },
    errorText: {
        color: "#FF6B6B",
        fontSize: 13,
        minHeight: 18,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#7C3AED",
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        color: "#A1A1AA",
        fontSize: 14,
    },
    link: {
        color: "#C084FC",
        fontSize: 14,
        fontWeight: "600",
    },
    buttonDisabled: {
        opacity: 0.7,
    }
});