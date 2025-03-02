import { Form, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { useState } from "react";

function FormRegister() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [errorRegister, setErrorRegister] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const result = await authApi.registerAuth(values);
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'Đăng ký thành công',
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1500)
            }
        } catch (error) {
            console.log(error.response.data.message);
            setErrorRegister(error.response.data.message)
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal title='Thông báo' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span className="text-red-500">{errorRegister}!</span>
            </Modal>
            {contextHolder}

            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Tạo tài khoản mới
                </h1>

                <button 
                    className="w-full max-w-sm flex items-center justify-center gap-2 border border-gray-300 rounded-md py-6 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    disabled={isLoading}
                >
                    <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
                        alt="Google" 
                        className="w-5 h-5" 
                    />
                    Đăng ký với Google
                </button>

                <div className="flex items-center my-6 w-full max-w-sm">
                    <hr className="flex-1 border-gray-300" />
                    <span className="mx-4 text-sm text-gray-500">Hoặc đăng ký với email</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                <Form
                    className="flex flex-col w-full max-w-sm space-y-4"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Họ và tên</span>}
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ tên!'
                            },
                        ]}
                    >
                        <input
                            placeholder="Nhập họ và tên của bạn"
                            className="p-3 border border-gray-300 py-4 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Tên đăng nhập</span>}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập!'
                            },
                        ]}
                    >
                        <input
                            placeholder="Nhập tên đăng nhập"
                            className="p-3 border border-gray-300 py-4 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Mật khẩu</span>}
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
                                placeholder="Nhập mật khẩu"
                                className="p-3 border border-gray-300 py-4 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                Đang đăng ký...
                            </div>
                        ) : (
                            'Tiếp tục'
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                            Đăng nhập
                        </Link>
                    </p>

                    <p className="mt-2 text-xs text-gray-500 text-center">
                        Bằng cách nhấp vào 'Tiếp tục', bạn đồng ý với{' '}
                        <span
                            onClick={() => navigate('/terms-of-service')}
                            className="underline text-indigo-600 cursor-pointer"
                        >
                            Điều khoản dịch vụ
                        </span>{' '}
                        và{' '}
                        <span
                            onClick={() => navigate('/privacy-policy')}
                            className="underline text-indigo-600 cursor-pointer"
                        >
                            Chính sách bảo mật
                        </span>.
                    </p>
                </Form>
            </div>
        </>
    );
}

export default FormRegister;