# 20110371
 homework_newtech_01
- Xuất data cho mỗi endpoint:
+ /  : xuất ra tất cả thông tin trong mygroup dạng json
 ![image](https://github.com/Hon1802/20110371/assets/74673759/e073426a-38ff-40df-9896-0d2eec3bcc67)
![image](https://github.com/Hon1802/20110371/assets/74673759/753cd2c8-b388-49f6-9187-bf9f4d509ccd)
+ /<MSSV>/<id> : nếu POST thì add item mới vào mygroup, item post dạng json, item phải là MSSV của thành viên nhóm trong đề tài cuối kỳ và chưa có trong danh sách mygroup. Nếu item không thỏa mãn yêu cầu thì xuất ra "Not valid"
  If exist, nếu GET thì nhận <id> và trả về thông tin tương ứng, thông tin trả về dạng json, nếu không có trả về {error:'not valid'}
![image](https://github.com/Hon1802/20110371/assets/74673759/00779c25-70ac-4b15-87b4-9d7eca9f1832)
![image](https://github.com/Hon1802/20110371/assets/74673759/93cb6153-e17c-4075-a325-388ff5483d67)
![image](https://github.com/Hon1802/20110371/assets/74673759/8110b76d-dae5-4eb5-bd83-659a7713c9ee)
If exist,
![image](https://github.com/Hon1802/20110371/assets/74673759/36d089f9-c76c-488f-baf7-b7f1992ba723)
![image](https://github.com/Hon1802/20110371/assets/74673759/bb60df9e-3475-425e-a27c-2a8e0988fc60)
![image](https://github.com/Hon1802/20110371/assets/74673759/62ada382-4521-4b89-8461-b6592f709bc7)
![image](https://github.com/Hon1802/20110371/assets/74673759/4dba8cca-3a8c-448d-9e3a-8ecf203aa11c)
![image](https://github.com/Hon1802/20110371/assets/74673759/848768c4-d34d-4ccf-be0d-d7798e3dbad7)
![image](https://github.com/Hon1802/20110371/assets/74673759/586eae63-75f4-4a57-8a11-b0c73f69f4d4)
+ /message/<id>: chỉ nhận giao thức GET, trả về dạng html theo form: <html><body><ul><li> <Họ Tên sinh viên></li></ul></body></html>. Nếu không có <id> thì trả về tên tất cả sinh viên trong mygruop, nếu không có thì trả về text "Not valid"
![image](https://github.com/Hon1802/20110371/assets/74673759/19ab6751-717c-4a85-94eb-79d41a824739)
![image](https://github.com/Hon1802/20110371/assets/74673759/4342f9f8-75f2-4c91-88b7-86d0c0e6d8b3)
![image](https://github.com/Hon1802/20110371/assets/74673759/04d8774e-a256-4af9-b495-bb1555ac355c)
![image](https://github.com/Hon1802/20110371/assets/74673759/ad7902c3-ba33-41b6-b015-53f25479df1a)

 
 

