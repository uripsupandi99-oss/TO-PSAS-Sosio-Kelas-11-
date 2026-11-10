import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Globe, Github, Cloud, Zap, ShieldCheck } from 'lucide-react';

interface GitHubCloudflareModalProps {
  onClose: () => void;
}

export const GitHubCloudflareModal: React.FC<GitHubCloudflareModalProps> = ({ onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = [
    'git remote add origin https://github.com/USERNAME/super-mario-sosiologi.git',
    'git push -u origin main',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-slate-900 border-4 border-amber-400 rounded-2xl shadow-2xl overflow-hidden text-white font-sans">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-5 py-4 border-b-2 border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-2 bg-amber-500/20 text-amber-300 rounded-lg">
              <Github className="w-5 h-5" />
              <span className="text-slate-400 font-bold">+</span>
              <Cloud className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-pixel text-yellow-300">
                KONEKSI GITHUB & CLOUDFLARE PAGES
              </h2>
              <p className="text-xs text-slate-400">
                Panduan integrasi deployment online cepat & gratis dengan performa tinggi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Status Badge */}
          <div className="bg-emerald-950/70 border-2 border-emerald-500/60 p-3.5 rounded-xl flex items-center gap-3 text-emerald-200">
            <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-pixel text-[11px] text-emerald-300 block font-bold">
                PROYEK SUDAH SIAP DEPLOY (CLOUDFLARE READY)
              </span>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                File <code>wrangler.toml</code>, <code>public/_redirects</code> (SPA), <code>functions/api/*</code>, dan GitHub Actions CI/CD sudah selesai dikonfigurasi!
              </p>
            </div>
          </div>

          {/* STEP 1: GITHUB */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs bg-amber-400 text-amber-950 px-2 py-0.5 rounded font-bold">
                LANGKAH 1
              </span>
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Github className="w-4 h-4 text-slate-300" />
                <span>Unggah Repositori ke GitHub Anda</span>
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              1. Buat repositori baru di{' '}
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 underline font-semibold inline-flex items-center gap-1"
              >
                github.com/new <ExternalLink className="w-3 h-3" />
              </a>{' '}
              (misal nama: <code>super-mario-sosiologi</code>).
            </p>
            <p className="text-xs text-slate-300">
              2. Jalankan perintah ini di terminal (ganti <code>USERNAME</code> dengan nama akun GitHub Anda):
            </p>

            <div className="space-y-1.5">
              {gitCommands.map((cmd, i) => (
                <div
                  key={i}
                  className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-[11px] text-amber-200"
                >
                  <span className="overflow-x-auto select-all">{cmd}</span>
                  <button
                    onClick={() => copyToClipboard(cmd, i)}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded ml-2 shrink-0 cursor-pointer"
                    title="Salin Perintah"
                  >
                    {copiedIndex === i ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2: CLOUDFLARE PAGES */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-bold">
                LANGKAH 2
              </span>
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-orange-400" />
                <span>Hubungkan GitHub ke Cloudflare Pages</span>
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              1. Buka dashboard Cloudflare di{' '}
              <a
                href="https://dash.cloudflare.com/"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 underline font-semibold inline-flex items-center gap-1"
              >
                dash.cloudflare.com <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              2. Masuk ke <strong>Workers & Pages</strong> &rarr; Klik <strong>Create Application</strong> &rarr; Pilih tab <strong>Pages</strong> &rarr; Klik <strong>Connect to Git</strong>.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              3. Pilih repositori <code>super-mario-sosiologi</code> dan masukkan pengaturan build:
            </p>

            {/* Config Specs Box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Framework preset:</span>
                <span className="text-amber-300 font-bold">Vite</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Build command:</span>
                <span className="text-emerald-400 font-bold">npm run build</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Build output directory:</span>
                <span className="text-sky-400 font-bold">dist</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Environment variable:</span>
                <span className="text-yellow-300">NODE_VERSION = 20</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              4. Klik <strong>Save and Deploy</strong>. Dalam 1 menit game aktif di URL gratis:
              <br />
              <code className="text-emerald-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 inline-block mt-1">
                https://super-mario-sosiologi.pages.dev
              </code>
            </p>
          </div>

          {/* Cloudflare Edge Benefit Info */}
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-pixel text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>KEUNGGULAN DI CLOUDFLARE PAGES:</span>
            </div>
            <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
              <li>Kecepatan loading secepat kilat melalui 300+ pusat data global Cloudflare.</li>
              <li>Sertifikat SSL / HTTPS otomatis aktif secara gratis.</li>
              <li>Dukungan API Serverless Edge Functions (<code>/functions/api/*</code>).</li>
              <li>Otomatis update setiap kali ada perubahan kode di GitHub!</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-pixel text-[10px]">
            Dokumentasi lengkap ada di file <strong>README.md</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-lg cursor-pointer transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
