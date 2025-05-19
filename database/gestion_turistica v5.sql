-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2025 a las 21:38:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_turistica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atraccion_turistica`
--

CREATE TABLE `atraccion_turistica` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `precio` int(30) NOT NULL COMMENT 'aqui se estable el precio de la atraccion turistica'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `atraccion_turistica`
--

INSERT INTO `atraccion_turistica` (`id`, `nombre`, `id_municipio`, `celular`, `precio`) VALUES
(3, 'paseo en ciudad', 171, '323432239', 89000),
(4, 'paseo en ciudad', 57, '32343333', 90000),
(5, 'paseo en ciudad', 791, '32342233', 145000),
(7, 'paseo caminata en ciudad', 57, '32344443', 123000),
(8, 'paseo a la cciudad amurallada', 171, '2138790', 110000),
(9, 'paseo a los manglares', 785, '3219809098', 89000),
(10, 'atraccion medellin', 547, '21239876', 87000),
(11, 'paseo por centro y ranchon', 507, '3212345456', 12000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `departamento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `departamento`) VALUES
(5, 'ANTIOQUIA'),
(8, 'ATLÁNTICO'),
(11, 'BOGOTÁ, D.C.'),
(13, 'BOLÍVAR'),
(15, 'BOYACÁ'),
(17, 'CALDAS'),
(18, 'CAQUETÁ'),
(19, 'CAUCA'),
(20, 'CESAR'),
(23, 'CÓRDOBA'),
(25, 'CUNDINAMARCA'),
(27, 'CHOCÓ'),
(41, 'HUILA'),
(44, 'LA GUAJIRA'),
(47, 'MAGDALENA'),
(50, 'META'),
(52, 'NARIÑO'),
(54, 'NORTE DE SANTANDER'),
(63, 'QUINDIO'),
(66, 'RISARALDA'),
(68, 'SANTANDER'),
(70, 'SUCRE'),
(73, 'TOLIMA'),
(76, 'VALLE DEL CAUCA'),
(81, 'ARAUCA'),
(85, 'CASANARE'),
(86, 'PUTUMAYO'),
(88, 'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CA'),
(91, 'AMAZONAS'),
(94, 'GUAINÍA'),
(95, 'GUAVIARE'),
(97, 'VAUPÉS'),
(99, 'VICHADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_persona_paquete`
--

CREATE TABLE `detalle_persona_paquete` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `id_paquete_turistico` int(11) NOT NULL,
  `estado` enum('activo','reservado','terminado','cancelado','en-proceso','vencido','pendiente') NOT NULL,
  `registro` date NOT NULL,
  `motivo_registro` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_persona_paquete`
--

INSERT INTO `detalle_persona_paquete` (`id`, `id_persona`, `id_paquete_turistico`, `estado`, `registro`, `motivo_registro`) VALUES
(5, 43, 7, 'activo', '2025-05-04', 'creacion'),
(7, 43, 7, 'activo', '2025-05-03', 'creacion'),
(8, 49, 16, 'pendiente', '2025-05-06', 'fecha de creacion por el usuario'),
(9, 49, 17, 'pendiente', '2025-05-06', 'fecha de creacion por el usuario'),
(11, 49, 3, 'pendiente', '2025-05-07', 'fecha de eleccion del usuario'),
(12, 49, 14, 'pendiente', '2025-05-07', 'fecha de eleccion del usuario'),
(13, 49, 7, 'pendiente', '2025-05-07', 'fecha de eleccion del usuario'),
(14, 49, 17, 'pendiente', '2025-05-07', 'fecha de eleccion del usuario'),
(16, 49, 13, 'pendiente', '2025-05-07', 'fecha de eleccion del usuario'),
(17, 49, 7, 'pendiente', '2025-05-10', 'fecha de eleccion del usuario'),
(18, 49, 7, 'cancelado', '2025-05-16', 'fecha de eleccion del usuario'),
(20, 49, 8, 'pendiente', '2025-05-11', 'fecha de eleccion del usuario'),
(21, 49, 7, 'cancelado', '2025-05-16', 'fecha de eleccion del usuario'),
(34, 50, 22, 'pendiente', '2025-05-17', 'creacion por admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `precio` int(30) NOT NULL COMMENT 'aqi se establece el valor que tiene el servicio por un dia',
  `foto` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id`, `nombre`, `id_municipio`, `celular`, `direccion`, `precio`, `foto`) VALUES
(3, 'Hotel casa blanca', 688, '32123231', 'calle 3 n 4-39', 239000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(4, 'hotel san antonio', 791, '31123211', 'valle 2 d 4-3', 40000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(5, 'hotel san roque', 171, '321232323', '25 de diciembre -30', 35000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(6, 'hotel el palmar', 57, '32123212', 'cra 3 n4-31', 45000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(7, 'hotel los robles', 877, '321232323', 'hab 34-54', 50000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(10, 'hotel san roque', 251, '323783498', 'call 3 n 43 56', 60000, NULL),
(11, 'hotel san juan', 831, '3145675456', 'call3 4 n 2-43', 120000, NULL),
(12, 'san miguel', 877, '3218908789', 'cal 2 n 5- 44', 130000, NULL),
(13, 'hotel san luis', 582, '3236789098', 'calle principal # 34-89', 100000, NULL),
(14, 'hotel isis', 729, '3125678765', 'calle 343 23-32', 120000, NULL),
(15, 'medellin hotel', 547, '3126617898', 'calle 1 n 1-01', 100000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(16, 'Hotel La Abuela', 507, '3219877889', 'calle 3 n 32 21', 110000, NULL),
(17, 'la trasnoijj', 345, '314354090', 'calle 56bn 4356', 80000, NULL),
(18, 'hotel san jose', 150, '4326567', 'calle 23 n 56.98', 120000, NULL),
(19, 'hotel medellin2', 547, '3216789876', 'calle 23 n 2-23', 120000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(20, 'hotel san jose', 547, '3127768987', 'cl 23 n 5-23', 90000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(21, 'hotel don jose', 547, '321567654', 'calle 23 n 3-22', 98000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(22, 'hotel marinilla ', 547, '3216787988', 'cra23 n 32 22', 110000, 'https://lh6.googleusercontent.com/proxy/wDGyDnjKTvuBUsu2uaEx1paAgpNSRTjqNy4PzaTmmwluAEOQG7CBAPFKHL67T5h5xSEwWSU5vGN99Eli53YDR4xvJ4s4rteAbOIKBGgsCxaxTWdmzqByw1_VxgzahicFPWqNKuCWgkmjLOu18ZEUcBCHBRDHqg=w253-h168-k-no'),
(23, 'Hotel Nutibara Medellín', 547, '3212344323', 'calle 343 23-32', 134000, 'https://lh3.googleusercontent.com/p/AF1QipMq4R0xf3BL8w0XEDdwCsmWZXNOcnN0HLtKdgHL=w253-h168-k-no'),
(24, 'hotel isis', 536, '3116789098', 'calle 3 n 4-39', 70000, 'null'),
(25, 'Onoma Hotel', 507, '3123454323', 'Cra. 16 #1BIS - 19', 74000, 'https://www.shutterstock.com/shutterstock/photos/2441702131/display_1500/stock-photo-honeymoon-swans-made-with-towels-and-beautiful-rose-petals-on-bed-in-room-2441702131.jpg'),
(26, 'Hotel Palmeras del Sinú', 507, '3212344334', 'Nuevo Campo Alegre, 231020', 130000, 'https://lh3.googleusercontent.com/p/AF1QipMb9nUtMxIyS6-cwrNYmYDOaT8UfTERwMbzI9sk=w253-h189-k-no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id` int(11) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `id_departamento` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id`, `municipio`, `id_departamento`, `estado`) VALUES
(1, 'Abriaquí', 5, 1),
(2, 'Acacías', 50, 1),
(3, 'Acandí', 27, 1),
(4, 'Acevedo', 41, 1),
(5, 'Achí', 13, 1),
(6, 'Agrado', 41, 1),
(7, 'Agua de Dios', 25, 1),
(8, 'Aguachica', 20, 1),
(9, 'Aguada', 68, 1),
(10, 'Aguadas', 17, 1),
(11, 'Aguazul', 85, 1),
(12, 'Agustín Codazzi', 20, 1),
(13, 'Aipe', 41, 1),
(14, 'Albania', 18, 1),
(15, 'Albania', 44, 1),
(16, 'Albania', 68, 1),
(17, 'Albán', 25, 1),
(18, 'Albán (San José)', 52, 1),
(19, 'Alcalá', 76, 1),
(20, 'Alejandria', 5, 1),
(21, 'Algarrobo', 47, 1),
(22, 'Algeciras', 41, 1),
(23, 'Almaguer', 19, 1),
(24, 'Almeida', 15, 1),
(25, 'Alpujarra', 73, 1),
(26, 'Altamira', 41, 1),
(27, 'Alto Baudó (Pie de Pato)', 27, 1),
(28, 'Altos del Rosario', 13, 1),
(29, 'Alvarado', 73, 1),
(30, 'Amagá', 5, 1),
(31, 'Amalfi', 5, 1),
(32, 'Ambalema', 73, 1),
(33, 'Anapoima', 25, 1),
(34, 'Ancuya', 52, 1),
(35, 'Andalucía', 76, 1),
(36, 'Andes', 5, 1),
(37, 'Angelópolis', 5, 1),
(38, 'Angostura', 5, 1),
(39, 'Anolaima', 25, 1),
(40, 'Anorí', 5, 1),
(41, 'Anserma', 17, 1),
(42, 'Ansermanuevo', 76, 1),
(43, 'Anzoátegui', 73, 1),
(44, 'Anzá', 5, 1),
(45, 'Apartadó', 5, 1),
(46, 'Apulo', 25, 1),
(47, 'Apía', 66, 1),
(48, 'Aquitania', 15, 1),
(49, 'Aracataca', 47, 1),
(50, 'Aranzazu', 17, 1),
(51, 'Aratoca', 68, 1),
(52, 'Arauca', 81, 1),
(53, 'Arauquita', 81, 1),
(54, 'Arbeláez', 25, 1),
(55, 'Arboleda (Berruecos)', 52, 1),
(56, 'Arboledas', 54, 1),
(57, 'Arboletes', 5, 1),
(58, 'Arcabuco', 15, 1),
(59, 'Arenal', 13, 1),
(60, 'Argelia', 5, 1),
(61, 'Argelia', 19, 1),
(62, 'Argelia', 76, 1),
(63, 'Ariguaní (El Difícil)', 47, 1),
(64, 'Arjona', 13, 1),
(65, 'Armenia', 5, 1),
(66, 'Armenia', 63, 1),
(67, 'Armero (Guayabal)', 73, 1),
(68, 'Arroyohondo', 13, 1),
(69, 'Astrea', 20, 1),
(70, 'Ataco', 73, 1),
(71, 'Atrato (Yuto)', 27, 1),
(72, 'Ayapel', 23, 1),
(73, 'Bagadó', 27, 1),
(74, 'Bahía Solano (Mútis)', 27, 1),
(75, 'Bajo Baudó (Pizarro)', 27, 1),
(76, 'Balboa', 19, 1),
(77, 'Balboa', 66, 1),
(78, 'Baranoa', 8, 1),
(79, 'Baraya', 41, 1),
(80, 'Barbacoas', 52, 1),
(81, 'Barbosa', 5, 1),
(82, 'Barbosa', 68, 1),
(83, 'Barichara', 68, 1),
(84, 'Barranca de Upía', 50, 1),
(85, 'Barrancabermeja', 68, 1),
(86, 'Barrancas', 44, 1),
(87, 'Barranco de Loba', 13, 1),
(88, 'Barranquilla', 8, 1),
(89, 'Becerríl', 20, 1),
(90, 'Belalcázar', 17, 1),
(91, 'Bello', 5, 1),
(92, 'Belmira', 5, 1),
(93, 'Beltrán', 25, 1),
(94, 'Belén', 15, 1),
(95, 'Belén', 52, 1),
(96, 'Belén de Bajirá', 27, 1),
(97, 'Belén de Umbría', 66, 1),
(98, 'Belén de los Andaquíes', 18, 1),
(99, 'Berbeo', 15, 1),
(100, 'Betania', 5, 1),
(101, 'Beteitiva', 15, 1),
(102, 'Betulia', 5, 1),
(103, 'Betulia', 68, 1),
(104, 'Bituima', 25, 1),
(105, 'Boavita', 15, 1),
(106, 'Bochalema', 54, 1),
(107, 'Bogotá D.C.', 11, 1),
(108, 'Bojacá', 25, 1),
(109, 'Bojayá (Bellavista)', 27, 1),
(110, 'Bolívar', 5, 1),
(111, 'Bolívar', 19, 1),
(112, 'Bolívar', 68, 1),
(113, 'Bolívar', 76, 1),
(114, 'Bosconia', 20, 1),
(115, 'Boyacá', 15, 1),
(116, 'Briceño', 5, 1),
(117, 'Briceño', 15, 1),
(118, 'Bucaramanga', 68, 1),
(119, 'Bucarasica', 54, 1),
(120, 'Buenaventura', 76, 1),
(121, 'Buenavista', 15, 1),
(122, 'Buenavista', 23, 1),
(123, 'Buenavista', 63, 1),
(124, 'Buenavista', 70, 1),
(125, 'Buenos Aires', 19, 1),
(126, 'Buesaco', 52, 1),
(127, 'Buga', 76, 1),
(128, 'Bugalagrande', 76, 1),
(129, 'Burítica', 5, 1),
(130, 'Busbanza', 15, 1),
(131, 'Cabrera', 25, 1),
(132, 'Cabrera', 68, 1),
(133, 'Cabuyaro', 50, 1),
(134, 'Cachipay', 25, 1),
(135, 'Caicedo', 5, 1),
(136, 'Caicedonia', 76, 1),
(137, 'Caimito', 70, 1),
(138, 'Cajamarca', 73, 1),
(139, 'Cajibío', 19, 1),
(140, 'Cajicá', 25, 1),
(141, 'Calamar', 13, 1),
(142, 'Calamar', 95, 1),
(143, 'Calarcá', 63, 1),
(144, 'Caldas', 5, 1),
(145, 'Caldas', 15, 1),
(146, 'Caldono', 19, 1),
(147, 'California', 68, 1),
(148, 'Calima (Darién)', 76, 1),
(149, 'Caloto', 19, 1),
(150, 'Calí', 76, 1),
(151, 'Campamento', 5, 1),
(152, 'Campo de la Cruz', 8, 1),
(153, 'Campoalegre', 41, 1),
(154, 'Campohermoso', 15, 1),
(155, 'Canalete', 23, 1),
(156, 'Candelaria', 8, 1),
(157, 'Candelaria', 76, 1),
(158, 'Cantagallo', 13, 1),
(159, 'Cantón de San Pablo', 27, 1),
(160, 'Caparrapí', 25, 1),
(161, 'Capitanejo', 68, 1),
(162, 'Caracolí', 5, 1),
(163, 'Caramanta', 5, 1),
(164, 'Carcasí', 68, 1),
(165, 'Carepa', 5, 1),
(166, 'Carmen de Apicalá', 73, 1),
(167, 'Carmen de Carupa', 25, 1),
(168, 'Carmen de Viboral', 5, 1),
(169, 'Carmen del Darién (CURBARADÓ)', 27, 1),
(170, 'Carolina', 5, 1),
(171, 'Cartagena', 13, 1),
(172, 'Cartagena del Chairá', 18, 1),
(173, 'Cartago', 76, 1),
(174, 'Carurú', 97, 1),
(175, 'Casabianca', 73, 1),
(176, 'Castilla la Nueva', 50, 1),
(177, 'Caucasia', 5, 1),
(178, 'Cañasgordas', 5, 1),
(179, 'Cepita', 68, 1),
(180, 'Cereté', 23, 1),
(181, 'Cerinza', 15, 1),
(182, 'Cerrito', 68, 1),
(183, 'Cerro San Antonio', 47, 1),
(184, 'Chachaguí', 52, 1),
(185, 'Chaguaní', 25, 1),
(186, 'Chalán', 70, 1),
(187, 'Chaparral', 73, 1),
(188, 'Charalá', 68, 1),
(189, 'Charta', 68, 1),
(190, 'Chigorodó', 5, 1),
(191, 'Chima', 68, 1),
(192, 'Chimichagua', 20, 1),
(193, 'Chimá', 23, 1),
(194, 'Chinavita', 15, 1),
(195, 'Chinchiná', 17, 1),
(196, 'Chinácota', 54, 1),
(197, 'Chinú', 23, 1),
(198, 'Chipaque', 25, 1),
(199, 'Chipatá', 68, 1),
(200, 'Chiquinquirá', 15, 1),
(201, 'Chiriguaná', 20, 1),
(202, 'Chiscas', 15, 1),
(203, 'Chita', 15, 1),
(204, 'Chitagá', 54, 1),
(205, 'Chitaraque', 15, 1),
(206, 'Chivatá', 15, 1),
(207, 'Chivolo', 47, 1),
(208, 'Choachí', 25, 1),
(209, 'Chocontá', 25, 1),
(210, 'Chámeza', 85, 1),
(211, 'Chía', 25, 1),
(212, 'Chíquiza', 15, 1),
(213, 'Chívor', 15, 1),
(214, 'Cicuco', 13, 1),
(215, 'Cimitarra', 68, 1),
(216, 'Circasia', 63, 1),
(217, 'Cisneros', 5, 1),
(218, 'Ciénaga', 15, 1),
(219, 'Ciénaga', 47, 1),
(220, 'Ciénaga de Oro', 23, 1),
(221, 'Clemencia', 13, 1),
(222, 'Cocorná', 5, 1),
(223, 'Coello', 73, 1),
(224, 'Cogua', 25, 1),
(225, 'Colombia', 41, 1),
(226, 'Colosó (Ricaurte)', 70, 1),
(227, 'Colón', 86, 1),
(228, 'Colón (Génova)', 52, 1),
(229, 'Concepción', 5, 1),
(230, 'Concepción', 68, 1),
(231, 'Concordia', 5, 1),
(232, 'Concordia', 47, 1),
(233, 'Condoto', 27, 1),
(234, 'Confines', 68, 1),
(235, 'Consaca', 52, 1),
(236, 'Contadero', 52, 1),
(237, 'Contratación', 68, 1),
(238, 'Convención', 54, 1),
(239, 'Copacabana', 5, 1),
(240, 'Coper', 15, 1),
(241, 'Cordobá', 63, 1),
(242, 'Corinto', 19, 1),
(243, 'Coromoro', 68, 1),
(244, 'Corozal', 70, 1),
(245, 'Corrales', 15, 1),
(246, 'Cota', 25, 1),
(247, 'Cotorra', 23, 1),
(248, 'Covarachía', 15, 1),
(249, 'Coveñas', 70, 1),
(250, 'Coyaima', 73, 1),
(251, 'Cravo Norte', 81, 1),
(252, 'Cuaspud (Carlosama)', 52, 1),
(253, 'Cubarral', 50, 1),
(254, 'Cubará', 15, 1),
(255, 'Cucaita', 15, 1),
(256, 'Cucunubá', 25, 1),
(257, 'Cucutilla', 54, 1),
(258, 'Cuitiva', 15, 1),
(259, 'Cumaral', 50, 1),
(260, 'Cumaribo', 99, 1),
(261, 'Cumbal', 52, 1),
(262, 'Cumbitara', 52, 1),
(263, 'Cunday', 73, 1),
(264, 'Curillo', 18, 1),
(265, 'Curití', 68, 1),
(266, 'Curumaní', 20, 1),
(267, 'Cáceres', 5, 1),
(268, 'Cáchira', 54, 1),
(269, 'Cácota', 54, 1),
(270, 'Cáqueza', 25, 1),
(271, 'Cértegui', 27, 1),
(272, 'Cómbita', 15, 1),
(273, 'Córdoba', 13, 1),
(274, 'Córdoba', 52, 1),
(275, 'Cúcuta', 54, 1),
(276, 'Dabeiba', 5, 1),
(277, 'Dagua', 76, 1),
(278, 'Dibulla', 44, 1),
(279, 'Distracción', 44, 1),
(280, 'Dolores', 73, 1),
(281, 'Don Matías', 5, 1),
(282, 'Dos Quebradas', 66, 1),
(283, 'Duitama', 15, 1),
(284, 'Durania', 54, 1),
(285, 'Ebéjico', 5, 1),
(286, 'El Bagre', 5, 1),
(287, 'El Banco', 47, 1),
(288, 'El Cairo', 76, 1),
(289, 'El Calvario', 50, 1),
(290, 'El Carmen', 54, 1),
(291, 'El Carmen', 68, 1),
(292, 'El Carmen de Atrato', 27, 1),
(293, 'El Carmen de Bolívar', 13, 1),
(294, 'El Castillo', 50, 1),
(295, 'El Cerrito', 76, 1),
(296, 'El Charco', 52, 1),
(297, 'El Cocuy', 15, 1),
(298, 'El Colegio', 25, 1),
(299, 'El Copey', 20, 1),
(300, 'El Doncello', 18, 1),
(301, 'El Dorado', 50, 1),
(302, 'El Dovio', 76, 1),
(303, 'El Espino', 15, 1),
(304, 'El Guacamayo', 68, 1),
(305, 'El Guamo', 13, 1),
(306, 'El Molino', 44, 1),
(307, 'El Paso', 20, 1),
(308, 'El Paujil', 18, 1),
(309, 'El Peñol', 52, 1),
(310, 'El Peñon', 13, 1),
(311, 'El Peñon', 68, 1),
(312, 'El Peñón', 25, 1),
(313, 'El Piñon', 47, 1),
(314, 'El Playón', 68, 1),
(315, 'El Retorno', 95, 1),
(316, 'El Retén', 47, 1),
(317, 'El Roble', 70, 1),
(318, 'El Rosal', 25, 1),
(319, 'El Rosario', 52, 1),
(320, 'El Tablón de Gómez', 52, 1),
(321, 'El Tambo', 19, 1),
(322, 'El Tambo', 52, 1),
(323, 'El Tarra', 54, 1),
(324, 'El Zulia', 54, 1),
(325, 'El Águila', 76, 1),
(326, 'Elías', 41, 1),
(327, 'Encino', 68, 1),
(328, 'Enciso', 68, 1),
(329, 'Entrerríos', 5, 1),
(330, 'Envigado', 5, 1),
(331, 'Espinal', 73, 1),
(332, 'Facatativá', 25, 1),
(333, 'Falan', 73, 1),
(334, 'Filadelfia', 17, 1),
(335, 'Filandia', 63, 1),
(336, 'Firavitoba', 15, 1),
(337, 'Flandes', 73, 1),
(338, 'Florencia', 18, 1),
(339, 'Florencia', 19, 1),
(340, 'Floresta', 15, 1),
(341, 'Florida', 76, 1),
(342, 'Floridablanca', 68, 1),
(343, 'Florián', 68, 1),
(344, 'Fonseca', 44, 1),
(345, 'Fortúl', 81, 1),
(346, 'Fosca', 25, 1),
(347, 'Francisco Pizarro', 52, 1),
(348, 'Fredonia', 5, 1),
(349, 'Fresno', 73, 1),
(350, 'Frontino', 5, 1),
(351, 'Fuente de Oro', 50, 1),
(352, 'Fundación', 47, 1),
(353, 'Funes', 52, 1),
(354, 'Funza', 25, 1),
(355, 'Fusagasugá', 25, 1),
(356, 'Fómeque', 25, 1),
(357, 'Fúquene', 25, 1),
(358, 'Gachalá', 25, 1),
(359, 'Gachancipá', 25, 1),
(360, 'Gachantivá', 15, 1),
(361, 'Gachetá', 25, 1),
(362, 'Galapa', 8, 1),
(363, 'Galeras (Nueva Granada)', 70, 1),
(364, 'Galán', 68, 1),
(365, 'Gama', 25, 1),
(366, 'Gamarra', 20, 1),
(367, 'Garagoa', 15, 1),
(368, 'Garzón', 41, 1),
(369, 'Gigante', 41, 1),
(370, 'Ginebra', 76, 1),
(371, 'Giraldo', 5, 1),
(372, 'Girardot', 25, 1),
(373, 'Girardota', 5, 1),
(374, 'Girón', 68, 1),
(375, 'Gonzalez', 20, 1),
(376, 'Gramalote', 54, 1),
(377, 'Granada', 5, 1),
(378, 'Granada', 25, 1),
(379, 'Granada', 50, 1),
(380, 'Guaca', 68, 1),
(381, 'Guacamayas', 15, 1),
(382, 'Guacarí', 76, 1),
(383, 'Guachavés', 52, 1),
(384, 'Guachené', 19, 1),
(385, 'Guachetá', 25, 1),
(386, 'Guachucal', 52, 1),
(387, 'Guadalupe', 5, 1),
(388, 'Guadalupe', 41, 1),
(389, 'Guadalupe', 68, 1),
(390, 'Guaduas', 25, 1),
(391, 'Guaitarilla', 52, 1),
(392, 'Gualmatán', 52, 1),
(393, 'Guamal', 47, 1),
(394, 'Guamal', 50, 1),
(395, 'Guamo', 73, 1),
(396, 'Guapota', 68, 1),
(397, 'Guapí', 19, 1),
(398, 'Guaranda', 70, 1),
(399, 'Guarne', 5, 1),
(400, 'Guasca', 25, 1),
(401, 'Guatapé', 5, 1),
(402, 'Guataquí', 25, 1),
(403, 'Guatavita', 25, 1),
(404, 'Guateque', 15, 1),
(405, 'Guavatá', 68, 1),
(406, 'Guayabal de Siquima', 25, 1),
(407, 'Guayabetal', 25, 1),
(408, 'Guayatá', 15, 1),
(409, 'Guepsa', 68, 1),
(410, 'Guicán', 15, 1),
(411, 'Gutiérrez', 25, 1),
(412, 'Guática', 66, 1),
(413, 'Gámbita', 68, 1),
(414, 'Gámeza', 15, 1),
(415, 'Génova', 63, 1),
(416, 'Gómez Plata', 5, 1),
(417, 'Hacarí', 54, 1),
(418, 'Hatillo de Loba', 13, 1),
(419, 'Hato', 68, 1),
(420, 'Hato Corozal', 85, 1),
(421, 'Hatonuevo', 44, 1),
(422, 'Heliconia', 5, 1),
(423, 'Herrán', 54, 1),
(424, 'Herveo', 73, 1),
(425, 'Hispania', 5, 1),
(426, 'Hobo', 41, 1),
(427, 'Honda', 73, 1),
(428, 'Ibagué', 73, 1),
(429, 'Icononzo', 73, 1),
(430, 'Iles', 52, 1),
(431, 'Imúes', 52, 1),
(432, 'Inzá', 19, 1),
(433, 'Inírida', 94, 1),
(434, 'Ipiales', 52, 1),
(435, 'Isnos', 41, 1),
(436, 'Istmina', 27, 1),
(437, 'Itagüí', 5, 1),
(438, 'Ituango', 5, 1),
(439, 'Izá', 15, 1),
(440, 'Jambaló', 19, 1),
(441, 'Jamundí', 76, 1),
(442, 'Jardín', 5, 1),
(443, 'Jenesano', 15, 1),
(444, 'Jericó', 5, 1),
(445, 'Jericó', 15, 1),
(446, 'Jerusalén', 25, 1),
(447, 'Jesús María', 68, 1),
(448, 'Jordán', 68, 1),
(449, 'Juan de Acosta', 8, 1),
(450, 'Junín', 25, 1),
(451, 'Juradó', 27, 1),
(452, 'La Apartada y La Frontera', 23, 1),
(453, 'La Argentina', 41, 1),
(454, 'La Belleza', 68, 1),
(455, 'La Calera', 25, 1),
(456, 'La Capilla', 15, 1),
(457, 'La Ceja', 5, 1),
(458, 'La Celia', 66, 1),
(459, 'La Cruz', 52, 1),
(460, 'La Cumbre', 76, 1),
(461, 'La Dorada', 17, 1),
(462, 'La Esperanza', 54, 1),
(463, 'La Estrella', 5, 1),
(464, 'La Florida', 52, 1),
(465, 'La Gloria', 20, 1),
(466, 'La Jagua de Ibirico', 20, 1),
(467, 'La Jagua del Pilar', 44, 1),
(468, 'La Llanada', 52, 1),
(469, 'La Macarena', 50, 1),
(470, 'La Merced', 17, 1),
(471, 'La Mesa', 25, 1),
(472, 'La Montañita', 18, 1),
(473, 'La Palma', 25, 1),
(474, 'La Paz', 68, 1),
(475, 'La Paz (Robles)', 20, 1),
(476, 'La Peña', 25, 1),
(477, 'La Pintada', 5, 1),
(478, 'La Plata', 41, 1),
(479, 'La Playa', 54, 1),
(480, 'La Primavera', 99, 1),
(481, 'La Salina', 85, 1),
(482, 'La Sierra', 19, 1),
(483, 'La Tebaida', 63, 1),
(484, 'La Tola', 52, 1),
(485, 'La Unión', 5, 1),
(486, 'La Unión', 52, 1),
(487, 'La Unión', 70, 1),
(488, 'La Unión', 76, 1),
(489, 'La Uvita', 15, 1),
(490, 'La Vega', 19, 1),
(491, 'La Vega', 25, 1),
(492, 'La Victoria', 15, 1),
(493, 'La Victoria', 17, 1),
(494, 'La Victoria', 76, 1),
(495, 'La Virginia', 66, 1),
(496, 'Labateca', 54, 1),
(497, 'Labranzagrande', 15, 1),
(498, 'Landázuri', 68, 1),
(499, 'Lebrija', 68, 1),
(500, 'Leiva', 52, 1),
(501, 'Lejanías', 50, 1),
(502, 'Lenguazaque', 25, 1),
(503, 'Leticia', 91, 1),
(504, 'Liborina', 5, 1),
(505, 'Linares', 52, 1),
(506, 'Lloró', 27, 1),
(507, 'Lorica', 23, 1),
(508, 'Los Córdobas', 23, 1),
(509, 'Los Palmitos', 70, 1),
(510, 'Los Patios', 54, 1),
(511, 'Los Santos', 68, 1),
(512, 'Lourdes', 54, 1),
(513, 'Luruaco', 8, 1),
(514, 'Lérida', 73, 1),
(515, 'Líbano', 73, 1),
(516, 'López (Micay)', 19, 1),
(517, 'Macanal', 15, 1),
(518, 'Macaravita', 68, 1),
(519, 'Maceo', 5, 1),
(520, 'Machetá', 25, 1),
(521, 'Madrid', 25, 1),
(522, 'Magangué', 13, 1),
(523, 'Magüi (Payán)', 52, 1),
(524, 'Mahates', 13, 1),
(525, 'Maicao', 44, 1),
(526, 'Majagual', 70, 1),
(527, 'Malambo', 8, 1),
(528, 'Mallama (Piedrancha)', 52, 1),
(529, 'Manatí', 8, 1),
(530, 'Manaure', 44, 1),
(531, 'Manaure Balcón del Cesar', 20, 1),
(532, 'Manizales', 17, 1),
(533, 'Manta', 25, 1),
(534, 'Manzanares', 17, 1),
(535, 'Maní', 85, 1),
(536, 'Mapiripan', 50, 1),
(537, 'Margarita', 13, 1),
(538, 'Marinilla', 5, 1),
(539, 'Maripí', 15, 1),
(540, 'Mariquita', 73, 1),
(541, 'Marmato', 17, 1),
(542, 'Marquetalia', 17, 1),
(543, 'Marsella', 66, 1),
(544, 'Marulanda', 17, 1),
(545, 'María la Baja', 13, 1),
(546, 'Matanza', 68, 1),
(547, 'Medellín', 5, 1),
(548, 'Medina', 25, 1),
(549, 'Medio Atrato', 27, 1),
(550, 'Medio Baudó', 27, 1),
(551, 'Medio San Juan (ANDAGOYA)', 27, 1),
(552, 'Melgar', 73, 1),
(553, 'Mercaderes', 19, 1),
(554, 'Mesetas', 50, 1),
(555, 'Milán', 18, 1),
(556, 'Miraflores', 15, 1),
(557, 'Miraflores', 95, 1),
(558, 'Miranda', 19, 1),
(559, 'Mistrató', 66, 1),
(560, 'Mitú', 97, 1),
(561, 'Mocoa', 86, 1),
(562, 'Mogotes', 68, 1),
(563, 'Molagavita', 68, 1),
(564, 'Momil', 23, 1),
(565, 'Mompós', 13, 1),
(566, 'Mongua', 15, 1),
(567, 'Monguí', 15, 1),
(568, 'Moniquirá', 15, 1),
(569, 'Montebello', 5, 1),
(570, 'Montecristo', 13, 1),
(571, 'Montelíbano', 23, 1),
(572, 'Montenegro', 63, 1),
(573, 'Monteria', 23, 1),
(574, 'Monterrey', 85, 1),
(575, 'Morales', 13, 1),
(576, 'Morales', 19, 1),
(577, 'Morelia', 18, 1),
(578, 'Morroa', 70, 1),
(579, 'Mosquera', 25, 1),
(580, 'Mosquera', 52, 1),
(581, 'Motavita', 15, 1),
(582, 'Moñitos', 23, 1),
(583, 'Murillo', 73, 1),
(584, 'Murindó', 5, 1),
(585, 'Mutatá', 5, 1),
(586, 'Mutiscua', 54, 1),
(587, 'Muzo', 15, 1),
(588, 'Málaga', 68, 1),
(589, 'Nariño', 5, 1),
(590, 'Nariño', 25, 1),
(591, 'Nariño', 52, 1),
(592, 'Natagaima', 73, 1),
(593, 'Nechí', 5, 1),
(594, 'Necoclí', 5, 1),
(595, 'Neira', 17, 1),
(596, 'Neiva', 41, 1),
(597, 'Nemocón', 25, 1),
(598, 'Nilo', 25, 1),
(599, 'Nimaima', 25, 1),
(600, 'Nobsa', 15, 1),
(601, 'Nocaima', 25, 1),
(602, 'Norcasia', 17, 1),
(603, 'Norosí', 13, 1),
(604, 'Novita', 27, 1),
(605, 'Nueva Granada', 47, 1),
(606, 'Nuevo Colón', 15, 1),
(607, 'Nunchía', 85, 1),
(608, 'Nuquí', 27, 1),
(609, 'Nátaga', 41, 1),
(610, 'Obando', 76, 1),
(611, 'Ocamonte', 68, 1),
(612, 'Ocaña', 54, 1),
(613, 'Oiba', 68, 1),
(614, 'Oicatá', 15, 1),
(615, 'Olaya', 5, 1),
(616, 'Olaya Herrera', 52, 1),
(617, 'Onzaga', 68, 1),
(618, 'Oporapa', 41, 1),
(619, 'Orito', 86, 1),
(620, 'Orocué', 85, 1),
(621, 'Ortega', 73, 1),
(622, 'Ospina', 52, 1),
(623, 'Otanche', 15, 1),
(624, 'Ovejas', 70, 1),
(625, 'Pachavita', 15, 1),
(626, 'Pacho', 25, 1),
(627, 'Padilla', 19, 1),
(628, 'Paicol', 41, 1),
(629, 'Pailitas', 20, 1),
(630, 'Paime', 25, 1),
(631, 'Paipa', 15, 1),
(632, 'Pajarito', 15, 1),
(633, 'Palermo', 41, 1),
(634, 'Palestina', 17, 1),
(635, 'Palestina', 41, 1),
(636, 'Palmar', 68, 1),
(637, 'Palmar de Varela', 8, 1),
(638, 'Palmas del Socorro', 68, 1),
(639, 'Palmira', 76, 1),
(640, 'Palmito', 70, 1),
(641, 'Palocabildo', 73, 1),
(642, 'Pamplona', 54, 1),
(643, 'Pamplonita', 54, 1),
(644, 'Pandi', 25, 1),
(645, 'Panqueba', 15, 1),
(646, 'Paratebueno', 25, 1),
(647, 'Pasca', 25, 1),
(648, 'Patía (El Bordo)', 19, 1),
(649, 'Pauna', 15, 1),
(650, 'Paya', 15, 1),
(651, 'Paz de Ariporo', 85, 1),
(652, 'Paz de Río', 15, 1),
(653, 'Pedraza', 47, 1),
(654, 'Pelaya', 20, 1),
(655, 'Pensilvania', 17, 1),
(656, 'Peque', 5, 1),
(657, 'Pereira', 66, 1),
(658, 'Pesca', 15, 1),
(659, 'Peñol', 5, 1),
(660, 'Piamonte', 19, 1),
(661, 'Pie de Cuesta', 68, 1),
(662, 'Piedras', 73, 1),
(663, 'Piendamó', 19, 1),
(664, 'Pijao', 63, 1),
(665, 'Pijiño', 47, 1),
(666, 'Pinchote', 68, 1),
(667, 'Pinillos', 13, 1),
(668, 'Piojo', 8, 1),
(669, 'Pisva', 15, 1),
(670, 'Pital', 41, 1),
(671, 'Pitalito', 41, 1),
(672, 'Pivijay', 47, 1),
(673, 'Planadas', 73, 1),
(674, 'Planeta Rica', 23, 1),
(675, 'Plato', 47, 1),
(676, 'Policarpa', 52, 1),
(677, 'Polonuevo', 8, 1),
(678, 'Ponedera', 8, 1),
(679, 'Popayán', 19, 1),
(680, 'Pore', 85, 1),
(681, 'Potosí', 52, 1),
(682, 'Pradera', 76, 1),
(683, 'Prado', 73, 1),
(684, 'Providencia', 52, 1),
(685, 'Providencia', 88, 1),
(686, 'Pueblo Bello', 20, 1),
(687, 'Pueblo Nuevo', 23, 1),
(688, 'Pueblo Rico', 66, 1),
(689, 'Pueblorrico', 5, 1),
(690, 'Puebloviejo', 47, 1),
(691, 'Puente Nacional', 68, 1),
(692, 'Puerres', 52, 1),
(693, 'Puerto Asís', 86, 1),
(694, 'Puerto Berrío', 5, 1),
(695, 'Puerto Boyacá', 15, 1),
(696, 'Puerto Caicedo', 86, 1),
(697, 'Puerto Carreño', 99, 1),
(698, 'Puerto Colombia', 8, 1),
(699, 'Puerto Concordia', 50, 1),
(700, 'Puerto Escondido', 23, 1),
(701, 'Puerto Gaitán', 50, 1),
(702, 'Puerto Guzmán', 86, 1),
(703, 'Puerto Leguízamo', 86, 1),
(704, 'Puerto Libertador', 23, 1),
(705, 'Puerto Lleras', 50, 1),
(706, 'Puerto López', 50, 1),
(707, 'Puerto Nare', 5, 1),
(708, 'Puerto Nariño', 91, 1),
(709, 'Puerto Parra', 68, 1),
(710, 'Puerto Rico', 18, 1),
(711, 'Puerto Rico', 50, 1),
(712, 'Puerto Rondón', 81, 1),
(713, 'Puerto Salgar', 25, 1),
(714, 'Puerto Santander', 54, 1),
(715, 'Puerto Tejada', 19, 1),
(716, 'Puerto Triunfo', 5, 1),
(717, 'Puerto Wilches', 68, 1),
(718, 'Pulí', 25, 1),
(719, 'Pupiales', 52, 1),
(720, 'Puracé (Coconuco)', 19, 1),
(721, 'Purificación', 73, 1),
(722, 'Purísima', 23, 1),
(723, 'Pácora', 17, 1),
(724, 'Páez', 15, 1),
(725, 'Páez (Belalcazar)', 19, 1),
(726, 'Páramo', 68, 1),
(727, 'Quebradanegra', 25, 1),
(728, 'Quetame', 25, 1),
(729, 'Quibdó', 27, 1),
(730, 'Quimbaya', 63, 1),
(731, 'Quinchía', 66, 1),
(732, 'Quipama', 15, 1),
(733, 'Quipile', 25, 1),
(734, 'Ragonvalia', 54, 1),
(735, 'Ramiriquí', 15, 1),
(736, 'Recetor', 85, 1),
(737, 'Regidor', 13, 1),
(738, 'Remedios', 5, 1),
(739, 'Remolino', 47, 1),
(740, 'Repelón', 8, 1),
(741, 'Restrepo', 50, 1),
(742, 'Restrepo', 76, 1),
(743, 'Retiro', 5, 1),
(744, 'Ricaurte', 25, 1),
(745, 'Ricaurte', 52, 1),
(746, 'Rio Negro', 68, 1),
(747, 'Rioblanco', 73, 1),
(748, 'Riofrío', 76, 1),
(749, 'Riohacha', 44, 1),
(750, 'Risaralda', 17, 1),
(751, 'Rivera', 41, 1),
(752, 'Roberto Payán (San José)', 52, 1),
(753, 'Roldanillo', 76, 1),
(754, 'Roncesvalles', 73, 1),
(755, 'Rondón', 15, 1),
(756, 'Rosas', 19, 1),
(757, 'Rovira', 73, 1),
(758, 'Ráquira', 15, 1),
(759, 'Río Iró', 27, 1),
(760, 'Río Quito', 27, 1),
(761, 'Río Sucio', 17, 1),
(762, 'Río Viejo', 13, 1),
(763, 'Río de oro', 20, 1),
(764, 'Ríonegro', 5, 1),
(765, 'Ríosucio', 27, 1),
(766, 'Sabana de Torres', 68, 1),
(767, 'Sabanagrande', 8, 1),
(768, 'Sabanalarga', 5, 1),
(769, 'Sabanalarga', 8, 1),
(770, 'Sabanalarga', 85, 1),
(771, 'Sabanas de San Angel (SAN ANGEL)', 47, 1),
(772, 'Sabaneta', 5, 1),
(773, 'Saboyá', 15, 1),
(774, 'Sahagún', 23, 1),
(775, 'Saladoblanco', 41, 1),
(776, 'Salamina', 17, 1),
(777, 'Salamina', 47, 1),
(778, 'Salazar', 54, 1),
(779, 'Saldaña', 73, 1),
(780, 'Salento', 63, 1),
(781, 'Salgar', 5, 1),
(782, 'Samacá', 15, 1),
(783, 'Samaniego', 52, 1),
(784, 'Samaná', 17, 1),
(785, 'Sampués', 70, 1),
(786, 'San Agustín', 41, 1),
(787, 'San Alberto', 20, 1),
(788, 'San Andrés', 68, 1),
(789, 'San Andrés Sotavento', 23, 1),
(790, 'San Andrés de Cuerquía', 5, 1),
(791, 'San Antero', 23, 1),
(792, 'San Antonio', 73, 1),
(793, 'San Antonio de Tequendama', 25, 1),
(794, 'San Benito', 68, 1),
(795, 'San Benito Abad', 70, 1),
(796, 'San Bernardo', 25, 1),
(797, 'San Bernardo', 52, 1),
(798, 'San Bernardo del Viento', 23, 1),
(799, 'San Calixto', 54, 1),
(800, 'San Carlos', 5, 1),
(801, 'San Carlos', 23, 1),
(802, 'San Carlos de Guaroa', 50, 1),
(803, 'San Cayetano', 25, 1),
(804, 'San Cayetano', 54, 1),
(805, 'San Cristobal', 13, 1),
(806, 'San Diego', 20, 1),
(807, 'San Eduardo', 15, 1),
(808, 'San Estanislao', 13, 1),
(809, 'San Fernando', 13, 1),
(810, 'San Francisco', 5, 1),
(811, 'San Francisco', 25, 1),
(812, 'San Francisco', 86, 1),
(813, 'San Gíl', 68, 1),
(814, 'San Jacinto', 13, 1),
(815, 'San Jacinto del Cauca', 13, 1),
(816, 'San Jerónimo', 5, 1),
(817, 'San Joaquín', 68, 1),
(818, 'San José', 17, 1),
(819, 'San José de Miranda', 68, 1),
(820, 'San José de Montaña', 5, 1),
(821, 'San José de Pare', 15, 1),
(822, 'San José de Uré', 23, 1),
(823, 'San José del Fragua', 18, 1),
(824, 'San José del Guaviare', 95, 1),
(825, 'San José del Palmar', 27, 1),
(826, 'San Juan de Arama', 50, 1),
(827, 'San Juan de Betulia', 70, 1),
(828, 'San Juan de Nepomuceno', 13, 1),
(829, 'San Juan de Pasto', 52, 1),
(830, 'San Juan de Río Seco', 25, 1),
(831, 'San Juan de Urabá', 5, 1),
(832, 'San Juan del Cesar', 44, 1),
(833, 'San Juanito', 50, 1),
(834, 'San Lorenzo', 52, 1),
(835, 'San Luis', 73, 1),
(836, 'San Luís', 5, 1),
(837, 'San Luís de Gaceno', 15, 1),
(838, 'San Luís de Palenque', 85, 1),
(839, 'San Marcos', 70, 1),
(840, 'San Martín', 20, 1),
(841, 'San Martín', 50, 1),
(842, 'San Martín de Loba', 13, 1),
(843, 'San Mateo', 15, 1),
(844, 'San Miguel', 68, 1),
(845, 'San Miguel', 86, 1),
(846, 'San Miguel de Sema', 15, 1),
(847, 'San Onofre', 70, 1),
(848, 'San Pablo', 13, 1),
(849, 'San Pablo', 52, 1),
(850, 'San Pablo de Borbur', 15, 1),
(851, 'San Pedro', 5, 1),
(852, 'San Pedro', 70, 1),
(853, 'San Pedro', 76, 1),
(854, 'San Pedro de Cartago', 52, 1),
(855, 'San Pedro de Urabá', 5, 1),
(856, 'San Pelayo', 23, 1),
(857, 'San Rafael', 5, 1),
(858, 'San Roque', 5, 1),
(859, 'San Sebastián', 19, 1),
(860, 'San Sebastián de Buenavista', 47, 1),
(861, 'San Vicente', 5, 1),
(862, 'San Vicente del Caguán', 18, 1),
(863, 'San Vicente del Chucurí', 68, 1),
(864, 'San Zenón', 47, 1),
(865, 'Sandoná', 52, 1),
(866, 'Santa Ana', 47, 1),
(867, 'Santa Bárbara', 5, 1),
(868, 'Santa Bárbara', 68, 1),
(869, 'Santa Bárbara (Iscuandé)', 52, 1),
(870, 'Santa Bárbara de Pinto', 47, 1),
(871, 'Santa Catalina', 13, 1),
(872, 'Santa Fé de Antioquia', 5, 1),
(873, 'Santa Genoveva de Docorodó', 27, 1),
(874, 'Santa Helena del Opón', 68, 1),
(875, 'Santa Isabel', 73, 1),
(876, 'Santa Lucía', 8, 1),
(877, 'Santa Marta', 47, 1),
(878, 'Santa María', 15, 1),
(879, 'Santa María', 41, 1),
(880, 'Santa Rosa', 13, 1),
(881, 'Santa Rosa', 19, 1),
(882, 'Santa Rosa de Cabal', 66, 1),
(883, 'Santa Rosa de Osos', 5, 1),
(884, 'Santa Rosa de Viterbo', 15, 1),
(885, 'Santa Rosa del Sur', 13, 1),
(886, 'Santa Rosalía', 99, 1),
(887, 'Santa Sofía', 15, 1),
(888, 'Santana', 15, 1),
(889, 'Santander de Quilichao', 19, 1),
(890, 'Santiago', 54, 1),
(891, 'Santiago', 86, 1),
(892, 'Santo Domingo', 5, 1),
(893, 'Santo Tomás', 8, 1),
(894, 'Santuario', 5, 1),
(895, 'Santuario', 66, 1),
(896, 'Sapuyes', 52, 1),
(897, 'Saravena', 81, 1),
(898, 'Sardinata', 54, 1),
(899, 'Sasaima', 25, 1),
(900, 'Sativanorte', 15, 1),
(901, 'Sativasur', 15, 1),
(902, 'Segovia', 5, 1),
(903, 'Sesquilé', 25, 1),
(904, 'Sevilla', 76, 1),
(905, 'Siachoque', 15, 1),
(906, 'Sibaté', 25, 1),
(907, 'Sibundoy', 86, 1),
(908, 'Silos', 54, 1),
(909, 'Silvania', 25, 1),
(910, 'Silvia', 19, 1),
(911, 'Simacota', 68, 1),
(912, 'Simijaca', 25, 1),
(913, 'Simití', 13, 1),
(914, 'Sincelejo', 70, 1),
(915, 'Sincé', 70, 1),
(916, 'Sipí', 27, 1),
(917, 'Sitionuevo', 47, 1),
(918, 'Soacha', 25, 1),
(919, 'Soatá', 15, 1),
(920, 'Socha', 15, 1),
(921, 'Socorro', 68, 1),
(922, 'Socotá', 15, 1),
(923, 'Sogamoso', 15, 1),
(924, 'Solano', 18, 1),
(925, 'Soledad', 8, 1),
(926, 'Solita', 18, 1),
(927, 'Somondoco', 15, 1),
(928, 'Sonsón', 5, 1),
(929, 'Sopetrán', 5, 1),
(930, 'Soplaviento', 13, 1),
(931, 'Sopó', 25, 1),
(932, 'Sora', 15, 1),
(933, 'Soracá', 15, 1),
(934, 'Sotaquirá', 15, 1),
(935, 'Sotara (Paispamba)', 19, 1),
(936, 'Sotomayor (Los Andes)', 52, 1),
(937, 'Suaita', 68, 1),
(938, 'Suan', 8, 1),
(939, 'Suaza', 41, 1),
(940, 'Subachoque', 25, 1),
(941, 'Sucre', 19, 1),
(942, 'Sucre', 68, 1),
(943, 'Sucre', 70, 1),
(944, 'Suesca', 25, 1),
(945, 'Supatá', 25, 1),
(946, 'Supía', 17, 1),
(947, 'Suratá', 68, 1),
(948, 'Susa', 25, 1),
(949, 'Susacón', 15, 1),
(950, 'Sutamarchán', 15, 1),
(951, 'Sutatausa', 25, 1),
(952, 'Sutatenza', 15, 1),
(953, 'Suárez', 19, 1),
(954, 'Suárez', 73, 1),
(955, 'Sácama', 85, 1),
(956, 'Sáchica', 15, 1),
(957, 'Tabio', 25, 1),
(958, 'Tadó', 27, 1),
(959, 'Talaigua Nuevo', 13, 1),
(960, 'Tamalameque', 20, 1),
(961, 'Tame', 81, 1),
(962, 'Taminango', 52, 1),
(963, 'Tangua', 52, 1),
(964, 'Taraira', 97, 1),
(965, 'Tarazá', 5, 1),
(966, 'Tarqui', 41, 1),
(967, 'Tarso', 5, 1),
(968, 'Tasco', 15, 1),
(969, 'Tauramena', 85, 1),
(970, 'Tausa', 25, 1),
(971, 'Tello', 41, 1),
(972, 'Tena', 25, 1),
(973, 'Tenerife', 47, 1),
(974, 'Tenjo', 25, 1),
(975, 'Tenza', 15, 1),
(976, 'Teorama', 54, 1),
(977, 'Teruel', 41, 1),
(978, 'Tesalia', 41, 1),
(979, 'Tibacuy', 25, 1),
(980, 'Tibaná', 15, 1),
(981, 'Tibasosa', 15, 1),
(982, 'Tibirita', 25, 1),
(983, 'Tibú', 54, 1),
(984, 'Tierralta', 23, 1),
(985, 'Timaná', 41, 1),
(986, 'Timbiquí', 19, 1),
(987, 'Timbío', 19, 1),
(988, 'Tinjacá', 15, 1),
(989, 'Tipacoque', 15, 1),
(990, 'Tiquisio (Puerto Rico)', 13, 1),
(991, 'Titiribí', 5, 1),
(992, 'Toca', 15, 1),
(993, 'Tocaima', 25, 1),
(994, 'Tocancipá', 25, 1),
(995, 'Toguí', 15, 1),
(996, 'Toledo', 5, 1),
(997, 'Toledo', 54, 1),
(998, 'Tolú', 70, 1),
(999, 'Tolú Viejo', 70, 1),
(1000, 'Tona', 68, 1),
(1001, 'Topagá', 15, 1),
(1002, 'Topaipí', 25, 1),
(1003, 'Toribío', 19, 1),
(1004, 'Toro', 76, 1),
(1005, 'Tota', 15, 1),
(1006, 'Totoró', 19, 1),
(1007, 'Trinidad', 85, 1),
(1008, 'Trujillo', 76, 1),
(1009, 'Tubará', 8, 1),
(1010, 'Tuchín', 23, 1),
(1011, 'Tulúa', 76, 1),
(1012, 'Tumaco', 52, 1),
(1013, 'Tunja', 15, 1),
(1014, 'Tunungua', 15, 1),
(1015, 'Turbaco', 13, 1),
(1016, 'Turbaná', 13, 1),
(1017, 'Turbo', 5, 1),
(1018, 'Turmequé', 15, 1),
(1019, 'Tuta', 15, 1),
(1020, 'Tutasá', 15, 1),
(1021, 'Támara', 85, 1),
(1022, 'Támesis', 5, 1),
(1023, 'Túquerres', 52, 1),
(1024, 'Ubalá', 25, 1),
(1025, 'Ubaque', 25, 1),
(1026, 'Ubaté', 25, 1),
(1027, 'Ulloa', 76, 1),
(1028, 'Une', 25, 1),
(1029, 'Unguía', 27, 1),
(1030, 'Unión Panamericana (ÁNIMAS)', 27, 1),
(1031, 'Uramita', 5, 1),
(1032, 'Uribe', 50, 1),
(1033, 'Uribia', 44, 1),
(1034, 'Urrao', 5, 1),
(1035, 'Urumita', 44, 1),
(1036, 'Usiacuri', 8, 1),
(1037, 'Valdivia', 5, 1),
(1038, 'Valencia', 23, 1),
(1039, 'Valle de San José', 68, 1),
(1040, 'Valle de San Juan', 73, 1),
(1041, 'Valle del Guamuez', 86, 1),
(1042, 'Valledupar', 20, 1),
(1043, 'Valparaiso', 5, 1),
(1044, 'Valparaiso', 18, 1),
(1045, 'Vegachí', 5, 1),
(1046, 'Venadillo', 73, 1),
(1047, 'Venecia', 5, 1),
(1048, 'Venecia (Ospina Pérez)', 25, 1),
(1049, 'Ventaquemada', 15, 1),
(1050, 'Vergara', 25, 1),
(1051, 'Versalles', 76, 1),
(1052, 'Vetas', 68, 1),
(1053, 'Viani', 25, 1),
(1054, 'Vigía del Fuerte', 5, 1),
(1055, 'Vijes', 76, 1),
(1056, 'Villa Caro', 54, 1),
(1057, 'Villa Rica', 19, 1),
(1058, 'Villa de Leiva', 15, 1),
(1059, 'Villa del Rosario', 54, 1),
(1060, 'Villagarzón', 86, 1),
(1061, 'Villagómez', 25, 1),
(1062, 'Villahermosa', 73, 1),
(1063, 'Villamaría', 17, 1),
(1064, 'Villanueva', 13, 1),
(1065, 'Villanueva', 44, 1),
(1066, 'Villanueva', 68, 1),
(1067, 'Villanueva', 85, 1),
(1068, 'Villapinzón', 25, 1),
(1069, 'Villarrica', 73, 1),
(1070, 'Villavicencio', 50, 1),
(1071, 'Villavieja', 41, 1),
(1072, 'Villeta', 25, 1),
(1073, 'Viotá', 25, 1),
(1074, 'Viracachá', 15, 1),
(1075, 'Vista Hermosa', 50, 1),
(1076, 'Viterbo', 17, 1),
(1077, 'Vélez', 68, 1),
(1078, 'Yacopí', 25, 1),
(1079, 'Yacuanquer', 52, 1),
(1080, 'Yaguará', 41, 1),
(1081, 'Yalí', 5, 1),
(1082, 'Yarumal', 5, 1),
(1083, 'Yolombó', 5, 1),
(1084, 'Yondó (Casabe)', 5, 1),
(1085, 'Yopal', 85, 1),
(1086, 'Yotoco', 76, 1),
(1087, 'Yumbo', 76, 1),
(1088, 'Zambrano', 13, 1),
(1089, 'Zapatoca', 68, 1),
(1090, 'Zapayán (PUNTA DE PIEDRAS)', 47, 1),
(1091, 'Zaragoza', 5, 1),
(1092, 'Zarzal', 76, 1),
(1093, 'Zetaquirá', 15, 1),
(1094, 'Zipacón', 25, 1),
(1095, 'Zipaquirá', 25, 1),
(1096, 'Zona Bananera (PRADO - SEVILLA)', 47, 1),
(1097, 'Ábrego', 54, 1),
(1098, 'Íquira', 41, 1),
(1099, 'Úmbita', 15, 1),
(1100, 'Útica', 25, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_turistico`
--

CREATE TABLE `paquete_turistico` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `clase` enum('PREMIUN','BASICO','LITE','PROMOCIONAL','PERSONALIZADO') NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL COMMENT 'fecha de inicio del paquete',
  `fecha_final` date NOT NULL COMMENT 'fecha de fin del paquete',
  `id_municipio` int(11) NOT NULL,
  `id_hotel` int(11) DEFAULT NULL,
  `id_restaurante` int(11) DEFAULT NULL,
  `id_atraccion_turistica` int(11) DEFAULT NULL,
  `id_transporte` int(11) DEFAULT NULL,
  `precio_dia` int(20) NOT NULL,
  `descuento` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete_turistico`
--

INSERT INTO `paquete_turistico` (`id`, `nombre`, `clase`, `descripcion`, `fecha_inicio`, `fecha_final`, `id_municipio`, `id_hotel`, `id_restaurante`, `id_atraccion_turistica`, `id_transporte`, `precio_dia`, `descuento`) VALUES
(2, 'Paquete Medellin Promocional', 'PROMOCIONAL', 'este paquete cuenta con todo para que disfrutes con tu pareja un paseo en medellin. ', '2025-04-24', '2025-04-30', 547, 21, 17, 10, 15, 301410, 10),
(3, 'Paquete basico cartagena.', 'BASICO', 'este paquete cuenta con todo un completo disfrute en cartagena, paseo otel y restaurante.', '2025-06-29', '2025-07-01', 171, 5, 3, 3, 6, 256700, 15),
(7, 'primer', 'PREMIUN', 'este pq es para muestra', '2025-04-10', '2025-04-16', 345, 4, 6, 3, 6, 23000, 0),
(8, 'san antero paquete', 'PREMIUN', 'este pa eys ', '2025-04-25', '2025-07-30', 791, 4, 8, 5, 10, 404000, 0),
(9, 'prueba', 'PREMIUN', 'jose', '2025-04-25', '2025-05-08', 547, 15, 17, 10, 16, 446900, 0),
(10, 'san antero2 paquete', 'PREMIUN', 'este pa eys ', '2025-05-25', '2025-05-29', 791, 4, 8, 5, 10, 213000, 0),
(11, 'san antero3 paquete', 'PREMIUN', 'este modificado ', '2025-05-25', '2025-05-29', 791, 4, 8, 5, 10, 214000, 0),
(12, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-05', '2025-05-07', 547, 15, 17, 10, 16, 893800, 0),
(13, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-05', '2025-05-07', 547, 15, 17, 10, 16, 893800, 0),
(14, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-05', '2025-05-07', 547, 19, 17, 10, 14, 869600, 0),
(15, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-05', '2025-05-07', 547, 19, 17, 10, 14, 869600, 0),
(16, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-05', '2025-05-07', 547, 19, 17, 10, 14, 869600, 0),
(17, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-05', '2025-05-07', 547, 19, 17, 10, 14, 869600, 0),
(18, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-11', '2025-05-15', 547, 23, 17, 10, 16, 1923600, 0),
(21, 'mi paquete', 'PERSONALIZADO', 'Paquete creado por el usuario', '2025-05-11', '2025-05-13', 507, 16, NULL, NULL, NULL, 220000, 0),
(22, 'Lorica full vacional', 'PREMIUN', 'este paquete cuenta con todo lo que necesitas para pasar un dia con tu pareja, conoceras lo mejor de lorica', '2025-05-15', '2025-10-03', 507, 25, 19, 11, 18, 144200, 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL COMMENT 'llave primaria de cada usuario',
  `primer_nombre` varchar(30) NOT NULL COMMENT 'Primer nombre del usuario',
  `segundo_nombre` varchar(30) DEFAULT NULL COMMENT 'El segundo nombre del usuario , no es obligatorio',
  `primer_apellido` varchar(30) NOT NULL COMMENT 'El primer apellido del usuario, es obligatorio',
  `segundo_apellido` varchar(30) DEFAULT NULL COMMENT 'EL segundo apellido del usuario, no es obligatorio',
  `tipo_identificacion` enum('cc','pasaporte','extrangeria') NOT NULL COMMENT 'EL tipo de identificacion del usuario, se usa un indice para enlazar la tabla de tipo de identificacion',
  `identificacion` int(15) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `celular` varchar(20) NOT NULL COMMENT 'El numero de celular del usuario, se usa modo varchar debido a que no se usara para realizar operaciones matematicas',
  `id_municipio` int(11) NOT NULL,
  `direccion` varchar(30) NOT NULL COMMENT 'Direccion del usuario',
  `genero` enum('m','f','otro') NOT NULL COMMENT 'Genero de el usuario',
  `correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `tipo_identificacion`, `identificacion`, `fecha_nacimiento`, `celular`, `id_municipio`, `direccion`, `genero`, `correo`) VALUES
(13, 'julilo', 'jose', 'calio', 'hjh', 'cc', 234238, '2008-11-22', '43234433', 403, 'jffhskfk', 'm', 'jfj@jhshj'),
(26, 'jose', 'antonio', 'cogollo', '', 'cc', 1076345782, '1988-04-20', '3126617876', 507, 'calle 4 n 6-98', 'm', 'joseantonio@hotmail.es'),
(35, 'angel', 'jesus', 'pena', '', 'pasaporte', 108837, '2009-03-10', '312456443', 710, 'call3 3hun45.99', 'm', 'angeljesus@hotmail.com'),
(36, 'jose', 'angel', 'peña', 'ballesteros', 'cc', 1063245789, '1989-02-14', '3126617989', 507, 'Calle 2 cr 3-10', 'm', 'jose.angel@hotmail.es'),
(43, 'DAVID', '', 'LOPEZ', '', 'cc', 1098787656, '2001-03-11', '3126617898', 507, 'CALLE 3 M 78 43', 'm', 'DAVID@GMAIL.COM'),
(48, 'catalina', '', 'lopez', '', 'cc', 109867876, '1990-12-11', '3212344321', 574, 'call3 4 n 65.98', 'f', 'catalina123@gmail.com'),
(49, 'francisco', '', 'berrocal', '', 'cc', 1098678765, '2001-11-11', '3126789876', 195, 'calle 23 n 56-32', 'm', 'franscisco@gmail.com.co'),
(50, 'Joel', 'david', 'peña', 'arteaga', 'cc', 109867898, '1990-08-11', '3126617898', 525, 'cra 23 n 23 76', 'm', 'joel.pena2580@gmail.com'),
(51, 'maria', 'angel', 'peña', 'arteaga', 'pasaporte', 1890876787, '1989-09-09', '3127789890', 698, 'cra 23 n 6 78', 'f', 'maria.pena@gmail.com'),
(52, 'jose', 'antonio', 'cogollo', 'lopez', 'cc', 1098787654, '1990-05-10', '3123456767', 493, 'calle 23 n 67-32', 'm', 'jose.cogollo@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurante`
--

CREATE TABLE `restaurante` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `precio` int(30) NOT NULL COMMENT 'aqui se establece el valor del servicio por dia'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `restaurante`
--

INSERT INTO `restaurante` (`id`, `nombre`, `id_municipio`, `celular`, `direccion`, `precio`) VALUES
(1, 'restaurante la zazon', 249, '32121232', 'calle 3 rde34', 70000),
(3, 'restaurante el caribe', 171, '32121232', 'cra 3 rde34', 80000),
(5, 'restaurante la olla', 57, '321232122', 'calle 3 rde3423', 120000),
(6, 'restaurante grandolo', 57, '2323231', 'cl 34 cr 34-22', 90000),
(7, 'restaurante el fogon', 791, '32122122', 'calle 3 rd423', 130000),
(8, 'restaurante grande', 791, '232323231', 'cl 34 cr 3-2', 130000),
(9, 'restaurante la fogata', 877, '32122122', 'calle 3 d423', 102000),
(10, 'restaurante holan', 877, '23232221', 'cl 34 cr 33-2', 98000),
(14, 'la zasonn', 345, '3212314354', 'calle 24 n 4356', 132000),
(15, 'la trasnosonn', 345, '314354', 'calle n 4356', 98000),
(16, 'la raza', 345, '32144354', 'calle 25 n 4356', 30000),
(17, 'meddellin restaurante', 547, '3212344332', 'calle 23 n 23-21', 139900),
(18, 'restaurante san lazaro', 729, '3124567654', 'cra 23 n 2 23', 80000),
(19, 'La Mula Restaurante Bar', 507, '304 6815661', '90, Lorica, Córdoba', 90000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(23) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'administrador'),
(2, 'recepcionista'),
(3, 'turista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte`
--

CREATE TABLE `transporte` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `precio` int(30) NOT NULL COMMENT 'aqui se guarda el precio por dia\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id`, `nombre`, `id_municipio`, `celular`, `precio`) VALUES
(3, 'transvala', 249, '43233332', 60000),
(4, 'trasvala', 249, '32123222', 80000),
(5, 'taxiexpres', 171, '43233332', 79000),
(6, 'transfort', 171, '32123222', 98000),
(7, 'taxiterco', 57, '45433332', 45000),
(8, 'transvalor', 57, '32144222', 98000),
(9, 'transjose', 791, '4543332', 678999),
(10, 'transdavidr', 791, '32143222', 89000),
(11, 'taxi san jose', 877, '45454332', 67000),
(12, 'transhtv', 877, '32143222', 56000),
(13, 'taxi feliz', 582, '3216789098', 78000),
(14, 'medellin', 547, '321678976', 87900),
(15, 'veloz medellin', 547, '3212345432', 10000),
(16, 'medellintaxia', 547, '3212343232', 120000),
(17, 'taxi san lazaro', 729, '3214323433', 70000),
(18, 'cotrasis', 507, '310 7285822', 30000),
(19, 'taxis lorica', 507, '3217890987', 30000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL COMMENT 'Esta es la id del tipo de usuario que va a tener l sistema',
  `password` varchar(200) NOT NULL,
  `login` varchar(200) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `password`, `login`, `id_rol`, `id_persona`) VALUES
(11, 'jose1234', 'jose@jose.com', 1, 13),
(12, 'jose1234', 'jose@gmail.com', 1, 26),
(13, '1234', 'jose.pena@gmail.com', 1, 36),
(14, 'francisco', 'francisco@gmail.com.co', 3, 49),
(17, 'maria2580', 'maria.pena@gmail.com', 3, 51),
(20, '1234', 'angeljesus@hotmail.com', 1, 35),
(21, '1234', 'catalina123@gmail.com', 1, 48),
(22, '1234', 'DAVID@GMAIL.COM', 1, 43);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atraccion_turistica`
--
ALTER TABLE `atraccion_turistica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `municipio` (`id_municipio`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_persona_paquete`
--
ALTER TABLE `detalle_persona_paquete`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_persona` (`id_persona`),
  ADD KEY `id_paquete_turistico` (`id_paquete_turistico`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `municipio` (`id_municipio`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_departamento` (`estado`),
  ADD KEY `municipio id_departamnento` (`id_departamento`);

--
-- Indices de la tabla `paquete_turistico`
--
ALTER TABLE `paquete_turistico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hotel` (`id_hotel`),
  ADD KEY `id_restuarante` (`id_restaurante`),
  ADD KEY `id_atraccion_turistica` (`id_atraccion_turistica`),
  ADD KEY `id_transporte` (`id_transporte`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identificacion` (`identificacion`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Indices de la tabla `restaurante`
--
ALTER TABLE `restaurante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mmunicipio` (`id_municipio`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `municipio` (`id_municipio`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_persona` (`id_persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atraccion_turistica`
--
ALTER TABLE `atraccion_turistica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `detalle_persona_paquete`
--
ALTER TABLE `detalle_persona_paquete`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1101;

--
-- AUTO_INCREMENT de la tabla `paquete_turistico`
--
ALTER TABLE `paquete_turistico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'llave primaria de cada usuario', AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `restaurante`
--
ALTER TABLE `restaurante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Esta es la id del tipo de usuario que va a tener l sistema', AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atraccion_turistica`
--
ALTER TABLE `atraccion_turistica`
  ADD CONSTRAINT `atraccion-id municipio` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_persona_paquete`
--
ALTER TABLE `detalle_persona_paquete`
  ADD CONSTRAINT `fk de id paquete t a paquete turistico` FOREIGN KEY (`id_paquete_turistico`) REFERENCES `paquete_turistico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk de id persona a persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `hotel id_municipio` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio id_departamnento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `paquete_turistico`
--
ALTER TABLE `paquete_turistico`
  ADD CONSTRAINT `fk-id-aturistica-aturistica` FOREIGN KEY (`id_atraccion_turistica`) REFERENCES `atraccion_turistica` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk-id-hotel-hotel` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk-id-municipio-municipio` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk-id-transporte-transporte` FOREIGN KEY (`id_transporte`) REFERENCES `transporte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_restaurante-id-restaurante` FOREIGN KEY (`id_restaurante`) REFERENCES `restaurante` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `persona idmunicipio` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `restaurante`
--
ALTER TABLE `restaurante`
  ADD CONSTRAINT `fk id municipio a municipio` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD CONSTRAINT `transporte a id municipio` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk idpersona-persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk idrol-a-rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
