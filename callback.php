<?php
$code    = $_GET['code']  ?? '';
$state   = $_GET['state'] ?? '1';
$error   = $_GET['error'] ?? '';
?><!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>OLX авторизація</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .card {
    background: #1e293b;
    border-radius: 16px;
    padding: 40px 32px;
    max-width: 480px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }
  .icon { font-size: 56px; margin-bottom: 16px; }
  h1 { font-size: 22px; margin-bottom: 8px; }
  .sub { color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
  .step {
    background: #0f172a;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 16px;
    text-align: left;
  }
  .step-num {
    display: inline-block;
    background: #3b82f6;
    color: #fff;
    border-radius: 50%;
    width: 24px; height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    margin-right: 10px;
  }
  .code-box {
    background: #0f172a;
    border: 2px solid #22c55e;
    border-radius: 10px;
    padding: 14px 18px;
    font-family: monospace;
    font-size: 15px;
    color: #22c55e;
    word-break: break-all;
    cursor: pointer;
    margin: 20px 0;
    user-select: all;
  }
  .btn {
    display: inline-block;
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s;
  }
  .btn:hover { background: #2563eb; }
  .copied { background: #22c55e !important; }
  .acnum { color: #94a3b8; font-size: 13px; margin-top: 20px; }
  .error-icon { font-size: 56px; }
</style>
</head>
<body>
<div class="card">
<?php if ($error): ?>
  <div class="error-icon">❌</div>
  <h1>Помилка авторизації</h1>
  <p class="sub"><?= htmlspecialchars($error) ?></p>
<?php elseif ($code): ?>
  <div class="icon">✅</div>
  <h1>Авторизацію отримано!</h1>
  <p class="sub">Скопіюйте код і вставте у Telegram-бот</p>

  <div class="step">
    <span class="step-num">1</span>
    Натисніть на код нижче — він виділиться
  </div>
  <div class="code-box" id="code" onclick="copyCode()"><?= htmlspecialchars($code) ?></div>
  <button class="btn" id="copyBtn" onclick="copyCode()">📋 Скопіювати код</button>

  <div class="step" style="margin-top:20px">
    <span class="step-num">2</span>
    Відкрийте <b>@Postcheker_bot</b> і вставте код (просто надішліть текст)
  </div>

  <p class="acnum">Акаунт #<?= htmlspecialchars($state) ?></p>
<?php else: ?>
  <div class="icon">⚠️</div>
  <h1>Код не знайдено</h1>
  <p class="sub">Спробуйте авторизуватись знову через бот</p>
<?php endif; ?>
</div>

<script>
function copyCode() {
  var code = document.getElementById('code').innerText;
  navigator.clipboard.writeText(code).then(function() {
    var btn = document.getElementById('copyBtn');
    btn.textContent = '✅ Скопійовано!';
    btn.classList.add('copied');
    setTimeout(function(){ btn.textContent = '📋 Скопіювати код'; btn.classList.remove('copied'); }, 2000);
  });
}
</script>
</body>
</html>
