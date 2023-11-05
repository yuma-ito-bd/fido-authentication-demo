// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import {create, supported} from "@github/webauthn-json";

// サインアップ処理
const signUpButton = document.getElementById('sign-up-button');
if (signUpButton && supported()) {
    signUpButton.addEventListener('click', async e => {
        e.preventDefault();

        // チャレンジの発行
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const form = e.target.closest('form');
        const formData = new FormData(form);
        const url = form.action;
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

    });
}
