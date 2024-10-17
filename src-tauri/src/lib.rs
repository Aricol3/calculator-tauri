#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
