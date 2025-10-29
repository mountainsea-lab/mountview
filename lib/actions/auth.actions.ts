'use server';

import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

/** ---------- Rust API 地址 (后续可改为环境变量) ---------- **/
const API_BASE_URL = process.env.RUST_API_URL || "http://localhost:10088/api";

/** ---------- 注册 ---------- **/
export const signUpWithEmail = async (form: SignUpFormData) => {
  try {
    // 模拟调用 Rust 后端 API
    // const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // const data = await response.json();

    // 默认 mock 返回
    const data = {
      user_id: "mock-user-123",
      email: form.email,
      name: form.fullName,
      message: "User created successfully (mock)",
    };

    // 成功时触发 Inngest 事件
    await inngest.send({
      name: "app/user.created",
      data: {
        email: form.email,
        name: form.fullName,
        country: form.country,
        investmentGoals: form.investmentGoals,
        riskTolerance: form.riskTolerance,
        preferredIndustry: form.preferredIndustry,
      },
    });

    return { success: true, data };
  } catch (e) {
    console.error("Sign up failed:", e);
    return { success: false, error: "Sign up failed" };
  }
};

/** ---------- 登录 ---------- **/
export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    // 模拟调用 Rust 后端 API
    // const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();

    const data = {
      token: "mock-token-xyz",
      email,
      message: "User signed in successfully (mock)",
    };

    return { success: true, data };
  } catch (e) {
    console.error("Sign in failed:", e);
    return { success: false, error: "Sign in failed" };
  }
};

/** ---------- 登出 ---------- **/
export const signOut = async () => {
  try {
    // 模拟调用 Rust 后端 API
    // const response = await fetch(`${API_BASE_URL}/auth/signout`, {
    //   method: "POST",
    //   headers: { ...Object.fromEntries(await headers()) },
    // });
    // const data = await response.json();

    const data = { message: "User signed out successfully (mock)" };

    return { success: true, data };
  } catch (e) {
    console.error("Sign out failed:", e);
    return { success: false, error: "Sign out failed" };
  }
};

/** ---------- 获取当前 Session ---------- **/
export const getSession = async () => {
  try {
    const hdrs = await headers();

    // ⚙️ 真实后端 API 调用（未来可替换）
    // const response = await fetch(`${API_BASE_URL}/auth/session`, {
    //   method: "GET",
    //   headers: Object.fromEntries(hdrs),
    //   cache: "no-store",
    // });
    // if (!response.ok) throw new Error("Session fetch failed");
    // const data = await response.json();

    // ✅ mock 默认返回
    const user = {
      id: "mock-user-123",
      email: "mockuser@example.com",
      name: "Mock User",
      token: "mock-session-token",
      expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // +1 hour
    };

    return { success: true, user };
  } catch (e) {
    console.error("Get session failed:", e);
    return { success: false, error: "Failed to fetch session" };
  }
};
