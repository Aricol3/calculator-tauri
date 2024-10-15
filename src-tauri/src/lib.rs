#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_vibrancy::*;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
                    let window = app.get_webview_window("main").unwrap();

                    #[cfg(target_os = "macos")]
                    apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

                    #[cfg(target_os = "windows")]
                    apply_acrylic(&window, Some((18, 18, 18, 125)))
                        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

                    Ok(())
                })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
