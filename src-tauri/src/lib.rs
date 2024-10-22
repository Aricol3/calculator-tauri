#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_vibrancy::*;
extern crate meval;

#[tauri::command]
fn evaluate_expression(expression: &str) -> String {
    match meval::eval_str(expression) {
        Ok(result) => format!("{}", result),
        Err(_) => "Error".to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![evaluate_expression])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
            .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_acrylic(&window, Some((0, 0, 0, 125)))
            .expect("Unsupported platform! 'apply_acrylic' is only supported on Windows");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
