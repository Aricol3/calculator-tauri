#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "windows"
)]

use chrono::NaiveDate;
use chrono::NaiveTime;
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

#[tauri::command]
fn subtract_dates(start: &str, end: &str) -> i64 {
    let start = NaiveDate::parse_from_str(start, "%Y-%m-%d").unwrap();
    let end = NaiveDate::parse_from_str(end, "%Y-%m-%d").unwrap();
    println!("{} sii {}",start,end);
    let diff = end - start;
    println!("{} si {}", diff.to_string(),diff);
    diff.num_days()
}

#[tauri::command]
fn subtract_time(start: &str, end: &str) -> i64 {
    let start = NaiveTime::parse_from_str(start, "%H:%M:%S").unwrap();
    let end = NaiveTime::parse_from_str(end, "%H:%M:%S").unwrap();
    println!("{} sii {}",start,end);
    let diff = end - start;
    println!("{} si {}", diff.to_string(),diff);
    diff.num_minutes()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![evaluate_expression, subtract_dates, subtract_time])
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
