import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { loginAction, signupAction } from "../../redux/authReducer/auth.action";
import { StatusPanel } from "./AuthStatusPopup";

const COPY = {
  login: {
    title: "Welcome back",
    subtitle: "Log in to pick up where you left off.",
    submit: "Log in",
    switchText: "New to Musicose?",
    switchAction: "Create an account",
  },
  signup: {
    title: "Create your account",
    subtitle: "Join Musicose for faster checkout and exclusive deals.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchAction: "Log in",
  },
};

const ACCOUNT_TYPES = [
  { value: "user", label: "Customer", hint: "Shop & track orders", icon: FiUser },
  { value: "admin", label: "Admin", hint: "Manage the store", icon: FiShield },
];

const EMPTY_FORM = { name: "", email: "", pass: "", type: "user" };

const fieldStyles = {
  size: "lg",
  borderRadius: "xl",
  bg: "gray.50",
  borderColor: "gray.200",
  fontSize: "md",
  focusBorderColor: "red.400",
  _hover: { borderColor: "gray.300" },
  _placeholder: { color: "gray.400" },
};

function Field({ label, icon, rightElement, ...inputProps }) {
  return (
    <FormControl isRequired>
      <FormLabel fontSize="sm" fontWeight="600" color="gray.700" mb="1.5">
        {label}
      </FormLabel>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={icon} color="gray.400" />
        </InputLeftElement>
        <Input {...fieldStyles} {...inputProps} />
        {rightElement}
      </InputGroup>
    </FormControl>
  );
}

function AuthModal({ isOpen, onClose, initialMode = "login", onLoginSuccess }) {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [signupDone, setSignupDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setForm(EMPTY_FORM);
      setShowPass(false);
      setError("");
      setSignupDone(false);
    }
  }, [isOpen, initialMode]);

  const isLogin = mode === "login";
  const copy = COPY[mode];

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setShowPass(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const result = isLogin
      ? await dispatch(loginAction({ email: form.email, pass: form.pass }))
      : await dispatch(signupAction(form));

    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.msg);
      return;
    }

    if (isLogin) {
      onClose();
      onLoginSuccess?.();
    } else {
      setSignupDone(true);
    }
  };

  const goToLoginAfterSignup = () => {
    setForm({ ...EMPTY_FORM, email: form.email });
    setSignupDone(false);
    switchMode("login");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(6px)" />
      <ModalContent
        mx="4"
        maxW="440px"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 25px 60px rgba(15, 23, 42, 0.35)"
      >
        <ModalCloseButton
          zIndex="2"
          top="3"
          right="3"
          borderRadius="full"
          color={signupDone ? "gray.500" : "white"}
          _hover={{ bg: signupDone ? "gray.100" : "whiteAlpha.300" }}
        />

        {signupDone ? (
          <ModalBody p="0">
            <StatusPanel
              title="Account created!"
              message={`Welcome to Musicose${
                form.name ? `, ${form.name.trim().split(" ")[0]}` : ""
              }. Log in with ${form.email} to get started.`}
              actionLabel="Continue to login"
              onAction={goToLoginAfterSignup}
            />
          </ModalBody>
        ) : (
          <>
            <Box
              position="relative"
              px="8"
              pt="8"
              pb="16"
              color="white"
              bg="linear-gradient(135deg, #111827 0%, #1f2937 55%, #7f1d1d 100%)"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-60px"
                right="-40px"
                boxSize="180px"
                borderRadius="full"
                bg="red.500"
                opacity="0.25"
                filter="blur(40px)"
              />
              <Image
                src="/musicose-logo-white.svg"
                alt="Musicose"
                h="28px"
                mb="6"
                position="relative"
              />
              <Text fontSize="2xl" fontWeight="800" position="relative">
                {copy.title}
              </Text>
              <Text mt="1" fontSize="sm" color="whiteAlpha.800" position="relative">
                {copy.subtitle}
              </Text>
            </Box>

            <ModalBody px="8" pt="0" pb="8" mt="-10" position="relative">
              <Flex
                bg="white"
                p="1"
                borderRadius="xl"
                boxShadow="0 10px 30px rgba(15, 23, 42, 0.12)"
                mb="6"
              >
                {["login", "signup"].map((tab) => (
                  <Button
                    key={tab}
                    flex="1"
                    size="md"
                    borderRadius="lg"
                    fontWeight="700"
                    bg={mode === tab ? "#111827" : "transparent"}
                    color={mode === tab ? "white" : "gray.500"}
                    _hover={{ bg: mode === tab ? "#111827" : "gray.100" }}
                    onClick={() => switchMode(tab)}
                  >
                    {tab === "login" ? "Log in" : "Sign up"}
                  </Button>
                ))}
              </Flex>

              <form onSubmit={handleSubmit}>
                <Stack spacing="4">
                  {error && (
                    <Alert status="error" borderRadius="xl" fontSize="sm" py="2.5">
                      <AlertIcon />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {!isLogin && (
                    <Field
                      label="Full name"
                      icon={FiUser}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  )}

                  <Field
                    label="Email address"
                    icon={FiMail}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                  <Field
                    label="Password"
                    icon={FiLock}
                    type={showPass ? "text" : "password"}
                    name="pass"
                    value={form.pass}
                    onChange={handleChange}
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    rightElement={
                      <InputRightElement>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          aria-label={showPass ? "Hide password" : "Show password"}
                          icon={<Icon as={showPass ? FiEyeOff : FiEye} color="gray.500" />}
                          onClick={() => setShowPass((prev) => !prev)}
                        />
                      </InputRightElement>
                    }
                  />

                  {!isLogin && (
                    <Box>
                      <Text fontSize="sm" fontWeight="600" color="gray.700" mb="1.5">
                        Account type
                      </Text>
                      <SimpleGrid columns={2} spacing="3" role="radiogroup">
                        {ACCOUNT_TYPES.map(({ value, label, hint, icon }) => {
                          const selected = form.type === value;
                          return (
                            <Flex
                              key={value}
                              as="button"
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => setForm((prev) => ({ ...prev, type: value }))}
                              align="center"
                              gap="3"
                              p="3"
                              textAlign="left"
                              borderRadius="xl"
                              borderWidth="2px"
                              borderColor={selected ? "red.400" : "gray.200"}
                              bg={selected ? "red.50" : "white"}
                              transition="all 0.15s"
                              _hover={{ borderColor: selected ? "red.400" : "gray.300" }}
                            >
                              <Flex
                                boxSize="34px"
                                flexShrink="0"
                                borderRadius="lg"
                                align="center"
                                justify="center"
                                bg={selected ? "red.500" : "gray.100"}
                                color={selected ? "white" : "gray.500"}
                              >
                                <Icon as={icon} />
                              </Flex>
                              <Box>
                                <Text fontSize="sm" fontWeight="700" color="gray.800">
                                  {label}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {hint}
                                </Text>
                              </Box>
                            </Flex>
                          );
                        })}
                      </SimpleGrid>
                    </Box>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    mt="2"
                    borderRadius="xl"
                    bg="red.500"
                    color="white"
                    fontWeight="700"
                    boxShadow="0 10px 24px rgba(239, 68, 68, 0.35)"
                    _hover={{ bg: "red.600", transform: "translateY(-1px)" }}
                    _active={{ bg: "red.700", transform: "none" }}
                    isLoading={isSubmitting}
                    loadingText={isLogin ? "Logging in" : "Creating account"}
                  >
                    {copy.submit}
                  </Button>
                </Stack>
              </form>

              <Text mt="6" textAlign="center" fontSize="sm" color="gray.500">
                {copy.switchText}{" "}
                <Box
                  as="button"
                  type="button"
                  fontWeight="700"
                  color="red.500"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => switchMode(isLogin ? "signup" : "login")}
                >
                  {copy.switchAction}
                </Box>
              </Text>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AuthModal;
