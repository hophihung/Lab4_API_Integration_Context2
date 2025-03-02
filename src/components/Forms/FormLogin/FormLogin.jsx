import { Form, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { useContext, useState } from "react";
import { userContext } from "../../../App";

function FormLogin() {
    const { token } = useContext(userContext);
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const result = await authApi.loginAuth(values);
            token(result.token);
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'Đăng nhập thành công!',
                });
            }
            setTimeout(() => {
                navigate('/user-profile')
            }, 1500)
        } catch (error) {
            console.log(error.response.data.message);
            setErrorLogin(error.response.data.message);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span className="text-red-500">{errorLogin}</span>
            </Modal>
            {contextHolder}

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Chào mừng trở lại</h2>

                    <button 
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 mb-6 transition duration-300"
                        disabled={isLoading}
                    >
                        <img 
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
                            alt="Google" 
                            className="w-5 h-5 mr-2" 
                        />
                        Đăng nhập với Google
                    </button>

                    <div className="flex items-center my-6">
                        <hr className="flex-1 border-gray-200" />
                        <span className="px-4 text-gray-500">Hoặc</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên đăng nhập!'
                                },
                            ]}
                        >
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="Nhập tên đăng nhập"
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!'
                                },
                                {
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số'
                                }
                            ]}
                        >
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Nhập mật khẩu"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </Form.Item>

                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-4 w-4 text-blue-600" 
                                />
                                <span className="ml-2 text-gray-700">Ghi nhớ đăng nhập</span>
                            </label>
                            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>

                        <p className="text-center text-gray-600 mt-8">
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default FormLogin;