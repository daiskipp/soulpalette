<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import Web3 from 'web3/dist/web3.min.js'
import NavLink from '@/Components/NavLink.vue';
defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

//submit時にasync loginWeb3メソッドを追加

const loginWeb3 = async () => {
    if (!window.ethereum) {
        alert('MetaMask not detected. Please try again from a MetaMask enabled browser.');
        return;
    }

    const web3 = new Web3(window.ethereum);

    const message = [
        "I have read and accept the terms and conditions (https://example.org/tos) of this app.",
        "Please sign me in!"
    ].join("\n")

    const address = (await web3.eth.requestAccounts())[0];
    const signature = await web3.eth.personal.sign(message, address);

    return useForm({ message, address, signature }).post('/login-web3');
};

const submit = async () => {
    try {
        await loginWeb3();

        form.transform(data => ({
            ...data,
            remember: form.remember ? 'on' : '',
        })).post(route('login'), {
            onFinish: () => form.reset('password'),
        });
    } catch (error) {
        console.error('Error with loginWeb3:', error);
    }
};
</script>

<template>
    <Head title="Log in" />

    <AuthenticationCard>
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col justify-center items-center pt-6 sm:pt-0">
                <img src="/images/soulpalette.png" class="block h-24 w-auto" alt="Logo">
                <h1 class="text-1xl font-bold mt-4 text-center">Welcome to the expressive<br> dialogue system</h1>
            </div>
        </div>
        <div class="text-center pt-4 pb-8 border-b border-gray-200">
            <button  @click="loginWeb3" class="btn btn-primary">
                Login with MetaMask
            </button>
        </div>
        <!--
        <div class="py-6 text-sm text-gray-500 text-center">
            or login with your credentials…
        </div>
        -->
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
<!--
          <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox v-model:checked="form.remember" name="remember" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Forgot your password?
                </Link>

                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Log in
                </PrimaryButton>
            </div>
          -->
        </form>

    </AuthenticationCard>
</template>

