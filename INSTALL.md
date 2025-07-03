# Hướng Dẫn Cài Đặt Gradient Glow Interface Pack

## 📋 Mục lục
- [Cài đặt từ Store](#cài-đặt-từ-store)
- [Cài đặt thủ công](#cài-đặt-thủ-công)
- [Cài đặt cho Developer](#cài-đặt-cho-developer)
- [Xác minh cài đặt](#xác-minh-cài-đặt)
- [Gỡ lỗi](#gỡ-lỗi)

## 🏪 Cài đặt từ Store

### Chrome Web Store
1. **Truy cập Chrome Web Store**
   - Mở Chrome và vào: https://chrome.google.com/webstore
   - Hoặc gõ `chrome://extensions/` và nhấp "Open Chrome Web Store"

2. **Tìm kiếm Extension**
   - Gõ "Gradient Glow Interface Pack" vào ô tìm kiếm
   - Hoặc tìm theo tác giả "XMP"

3. **Cài đặt**
   - Nhấp vào extension trong kết quả tìm kiếm
   - Nhấp nút **"Add to Chrome"**
   - Xác nhận trong popup: **"Add extension"**

4. **Hoàn tất**
   - Icon extension sẽ xuất hiện trên thanh công cụ
   - Có thể cần refresh các tab đang mở

### Firefox Add-ons
1. **Truy cập Firefox Add-ons**
   - Mở Firefox và vào: https://addons.mozilla.org
   - Hoặc nhấn `Ctrl+Shift+A` để mở Add-ons Manager

2. **Tìm kiếm**
   - Tìm "Gradient Glow Interface Pack"
   - Hoặc browse trong category "Appearance"

3. **Cài đặt**
   - Nhấp **"Add to Firefox"**
   - Cho phép cài đặt khi được hỏi

4. **Hoàn tất**
   - Icon sẽ xuất hiện trên toolbar
   - Extension tự động kích hoạt

### Microsoft Edge
1. **Sử dụng Chrome Web Store**
   - Edge có thể cài extensions từ Chrome Web Store
   - Vào Edge và truy cập Chrome Web Store
   - Làm theo hướng dẫn Chrome ở trên

## 🔧 Cài đặt thủ công

### Tải Source Code
```bash
# Clone từ GitHub
git clone https://github.com/tuananh93cp/Gradient-Glow-Interface-Pack.git

# Hoặc download ZIP và giải nén
```

### Cài đặt trên Chrome/Edge
1. **Bật Developer Mode**
   - Mở Chrome và vào `chrome://extensions/`
   - Bật toggle **"Developer mode"** ở góc phải trên

2. **Load Extension**
   - Nhấp **"Load unpacked"**
   - Chọn thư mục chứa file `manifest.json`
   - Extension sẽ được thêm vào danh sách

3. **Kích hoạt**
   - Đảm bảo toggle extension được bật
   - Pin icon vào toolbar nếu muốn

### Cài đặt trên Firefox
1. **Temporary Installation**
   - Mở Firefox và vào `about:debugging`
   - Nhấp **"This Firefox"**
   - Nhấp **"Load Temporary Add-on"**
   - Chọn file `manifest-firefox.json`

2. **Permanent Installation**
   - Cần sign extension qua Mozilla
   - Hoặc dùng Firefox Developer Edition

## 🧑‍💻 Cài đặt cho Developer

### Yêu cầu hệ thống
- Node.js 14+ (không bắt buộc)
- Git
- Chrome hoặc Firefox Developer tools

### Setup Development
```bash
# Clone repository
git clone https://github.com/tuananh93cp/Gradient-Glow-Interface-Pack.git
cd Gradient-Glow-Interface-Pack

# Install dependencies (nếu có)
npm install

# Start development
npm run dev
```

### Build cho Production
```bash
# Build for Chrome
npm run package-chrome

# Build for Firefox  
npm run package-firefox
```

### File Structure
```
Extension2/
├── manifest.json          # Chrome manifest
├── manifest-firefox.json  # Firefox manifest
├── popup.html             # Extension popup
├── popup.js
├── content.js             # Content script
├── background.js          # Background script
├── options.html           # Options page
├── options.js
├── styles/
│   ├── popup.css
│   ├── options.css
│   └── gradient-themes.css
├── icons/                 # Extension icons
├── README.md
└── package.json
```

## ✅ Xác minh cài đặt

### Kiểm tra Extension hoạt động
1. **Icon hiển thị**: Tìm icon trên toolbar
2. **Popup mở được**: Click icon và popup hiện ra
3. **Theme áp dụng**: Chọn theme và thấy thay đổi
4. **Options page**: Nhấp "Cài đặt chi tiết"

### Test trên các website
- **Facebook**: Kiểm tra header và sidebar
- **YouTube**: Kiểm tra video player và comments
- **Gmail**: Kiểm tra compose và inbox
- **GitHub**: Kiểm tra code và navigation

### Kiểm tra Console
1. Mở DevTools (`F12`)
2. Vào tab **Console**
3. Không có lỗi liên quan đến extension
4. Check tab **Application** > **Local Storage**

## 🐛 Gỡ lỗi

### Extension không hiển thị
```bash
# Kiểm tra:
1. Extension có được enable không?
2. Icon có bị ẩn không? (nhấp puzzle icon)
3. Có conflict với extension khác không?
4. Try disable/enable lại
```

### Theme không áp dụng
```bash
# Debug:
1. Refresh trang web
2. Kiểm tra console có lỗi CSS không
3. Disable other theme extensions
4. Check permissions trong chrome://extensions/
```

### Popup không mở
```bash
# Sửa:
1. Right-click icon > "Inspect popup"
2. Kiểm tra console errors
3. Try reload extension
4. Check manifest.json syntax
```

### Performance issues
```bash
# Tối ưu:
1. Disable animations nếu máy chậm
2. Giảm intensity effects
3. Check CPU usage trong Task Manager
4. Disable extension temporarily
```

### Conflicts với websites
```bash
# Giải quyết:
1. Report bug với URL cụ thể
2. Temporary disable cho site đó
3. Check CSS specificity issues
4. Use browser's incognito mode
```

## 📞 Hỗ trợ

### Báo cáo vấn đề
- **GitHub Issues**: https://github.com/tuananh93cp/Gradient-Glow-Interface-Pack/issues
- **Email**: lanhanh64529@gmail.com

### Thông tin cần cung cấp khi báo bug
1. Browser và version
2. Extension version
3. OS (Windows/Mac/Linux)
4. Website xảy ra lỗi
5. Steps to reproduce
6. Screenshots (nếu có)

### FAQ
**Q: Extension có làm chậm browser không?**
A: Không, được tối ưu performance với CSS3 và GPU acceleration.

**Q: Có thu thập dữ liệu cá nhân không?**
A: Không, chỉ lưu settings local, không gửi data ra ngoài.

**Q: Tương thích với extensions khác không?**
A: Có, nhưng có thể conflict với theme extensions khác.

---

🎉 **Chúc bạn trải nghiệm vui vẻ với Gradient Glow Interface Pack!** 