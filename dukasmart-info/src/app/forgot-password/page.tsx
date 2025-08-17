
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gem } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "admin@duka.smart";

export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const [email, setEmail] = React.useState("");
    const [isEmailCorrect, setIsEmailCorrect] = React.useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setIsEmailCorrect(enteredEmail.toLowerCase() === ADMIN_EMAIL);
    };

    const handleIncorrectSubmit = () => {
        toast({
            title: "Email Not Found",
            description: "The email you entered does not match our records. Please try again.",
            variant: "destructive",
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 flex justify-center text-primary">
                    <Gem className="h-12 w-12" />
                </div>
                <Card>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold font-headline">
                            Forgot Password?
                        </CardTitle>
                        <CardDescription>
                            Enter your email to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            {isEmailCorrect ? (
                                <Button href="/reset-password" className="w-full bg-primary hover:bg-primary/90">
                                    Reset Password
                                </Button>
                            ) : (
                                <Button onClick={handleIncorrectSubmit} className="w-full bg-primary hover:bg-primary/90">
                                    Send Reset Link
                                </Button>
                            )}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            <Link href="/" className="underline">
                                Back to login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
