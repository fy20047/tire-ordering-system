import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage, 
  Input,
  Select,
  VStack,
  Heading,
  useToast, 
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import type { OrderFormData } from '../types';

const OrderForm = () => {
  const toast = useToast(); // 初始化 Toast

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    tireBrand: 'Bridgestone',
    tireSeries: '',
    tireSize: '',
    quantity: 4,
    installationOption: 'YES_INSTALL',
    deliveryAddress: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  
  // 用來簡單判斷是否顯示錯誤 (例如地址欄位)
  const isAddressInvalid = formData.installationOption === 'NO_DELIVERY' && formData.deliveryAddress === '';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (valueString: string, valueNumber: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity: valueNumber,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 前端簡單防呆
    if (isAddressInvalid) {
        toast({
            title: '請填寫地址',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
        });
        return;
    }

    setIsLoading(true);

    try {
      await axios.post('http://localhost:8080/api/orders', formData);

      toast({
        title: '訂單建立成功！',
        description: "我們會盡快與您聯繫。",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      
    } catch (error: any) {
      const errorMsg = error.response?.data || '系統發生錯誤';
      toast({
        title: '建立失敗',
        description: errorMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt={10}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        🛞 輪胎預約下單
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={6}> {/* v2 是用 spacing */}
          
          {/* 第一列：姓名 & 電話 */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            <FormControl isRequired>
              <FormLabel>姓名</FormLabel>
              <Input
                name="customerName"
                placeholder="請輸入您的姓名"
                value={formData.customerName}
                onChange={handleChange}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>電話</FormLabel>
              <Input
                name="phone"
                placeholder="09xx-xxx-xxx"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>
          </SimpleGrid>

          {/* 第二列：品牌 */}
          <FormControl>
            <FormLabel>輪胎品牌</FormLabel>
            <Select
              name="tireBrand"
              value={formData.tireBrand}
              onChange={handleChange}
            >
              <option value="Bridgestone">Bridgestone (普利司通)</option>
              <option value="Michelin">Michelin (米其林)</option>
              <option value="Continental">Continental (馬牌)</option>
            </Select>
          </FormControl>

          {/* 第三列：系列、規格、數量 */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
            <FormControl isRequired>
              <FormLabel>系列</FormLabel>
              <Input
                name="tireSeries"
                placeholder="例如：Alenza"
                value={formData.tireSeries}
                onChange={handleChange}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>規格</FormLabel>
              <Input
                name="tireSize"
                placeholder="例如：225/60/R18"
                value={formData.tireSize}
                onChange={handleChange}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>數量</FormLabel>
              <NumberInput
                min={1}
                max={100}
                value={formData.quantity}
                onChange={handleQuantityChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </SimpleGrid>

          {/* 第四列：服務方式 */}
          <FormControl>
            <FormLabel>服務方式</FormLabel>
            <Select
              name="installationOption"
              value={formData.installationOption}
              onChange={handleChange}
            >
              <option value="YES_INSTALL">預約到店安裝</option>
              <option value="NO_PICKUP">純購買 (店面自取)</option>
              <option value="NO_DELIVERY">純購買 (寄送)</option>
            </Select>
          </FormControl>

          {/* 條件渲染：地址 */}
          {/* v2 的 isInvalid 屬性可以讓輸入框自動變紅，非常方便 */}
          {formData.installationOption === 'NO_DELIVERY' && (
            <FormControl isRequired isInvalid={isAddressInvalid}>
              <FormLabel>寄送地址</FormLabel>
              <Input
                name="deliveryAddress"
                placeholder="請輸入完整收件地址"
                value={formData.deliveryAddress}
                onChange={handleChange}
              />
              {/* 自動顯示錯誤訊息 */}
              <FormErrorMessage>配送服務必填此欄位</FormErrorMessage>
            </FormControl>
          )}

          <Button
            type="submit"
            colorScheme="blue" // v2 是 colorScheme，不是 colorPalette
            size="lg"
            width="full"
            mt={4}
            isLoading={isLoading}
            loadingText="送出中..."
          >
            送出預約單
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default OrderForm;