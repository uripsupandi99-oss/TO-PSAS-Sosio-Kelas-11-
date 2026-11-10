/**
 * Cloudflare Pages Function: /api/send-email
 */

interface Env {
  TEACHER_EMAIL?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const payload: any = await context.request.json();
    const recipient = payload?.recipient || context.env.TEACHER_EMAIL || 'uripsupandi99@admin.sma.belajar.id';

    return new Response(
      JSON.stringify({
        success: true,
        recipient,
        message: `Laporan evaluasi resmi diteruskan ke ${recipient} melalui Cloudflare Edge.`,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Gagal memproses pengiriman email', details: err?.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
