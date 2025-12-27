import { Box } from "@chakra-ui/react"
// 記得確認這個路徑是對的，你的檔案應該在 src/components/OrderForm.tsx
import OrderForm from "./components/OrderForm"

function App() {
  return (
    // Box 是 Chakra UI 的基本容器，bg="gray.50" 會讓背景變成淡灰色
    <Box bg="gray.50" minH="100vh" py={10}>
      <OrderForm />
    </Box>
  )
}

export default App