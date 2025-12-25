# Tele Bot - Auto forward message từ group order(đặt hàng) đến loader(vận chuyển, xứ lý hàng)
## 1. Tổng quan
Ở group order bot sẽ tự động phân tích tin nhắn để biết được đâu là tin nhắn order sản phầm, sau đó customer lại nội dung để gửi đến group loader<br>
Ở group loader, sau khi được bot gửi đơn hàng đến, bộ phận xử lý sẽ tiếp nhận và vận chuyển đến hàng đến cho người đặt hàng
## 2. Các chức năng chính
1. Quản lý danh sách group (để list ra được các group mà bot được add vào sau đó người dùng có thể chỉ định group nào là group nhận order, group nào là group xử lý order)
2. Quản lý, chỉ định group order, loader
3. Tự động forward message từ group order sang loader khi có đơn hàng mới
4. Tự động forward message từ group loader sang order khi đơn hàng được hoàn thành
5. Tự động gửi danh sách sản phẩm mới hàng ngày lên các group
6. Tổng hợp danh sách order đã được xử lý trong ngày
## 3. Cấu trúc project
