// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import {create, get, supported} from "@github/webauthn-json";

// サインアップ処理
const signUpButton = document.getElementById('sign-up-button');
if (signUpButton && supported()) {
    signUpButton.addEventListener('click', async e => {
        e.preventDefault();

        // チャレンジの発行
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const form = e.target.closest('form');
        const formData = new FormData(form);
        const url = form.dataset.newChallengeUrl;
        const options = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken
            },
            body: formData
        }).then(response => response.json());

        // 認証機で公開鍵などのクレデンシャルを生成
        const credential = await create({publicKey: options});

        // クレデンシャルをサーバーに送信
        form.elements['user_passkey_credential'].value = JSON.stringify(credential);
        form.submit();
    });
}

// サインイン処理
const signInButton = document.getElementById('sign-in-button');
if (signInButton && supported()) {
    signInButton.addEventListener('click', async e => {
        e.preventDefault();

        // チャレンジの発行
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const form = e.target.closest('form');
        const formData = new FormData(form);
        const url = form.dataset.newChallengeUrl;
        const options = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken
            },
            body: formData
        }).then(response => response.json());

        // 認証機で認証する
        const credential = await get({publicKey: options});

        // クレデンシャルをサーバーに送信
        form.elements['user_passkey_credential'].value = JSON.stringify(credential);
        form.submit();
    });
}