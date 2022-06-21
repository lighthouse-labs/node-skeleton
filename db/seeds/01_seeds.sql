INSERT INTO users (name, email, password, admin, city, province, country)
VALUES
('La Frenz Estate Winery', 'lfestate@gmail.com', 'Qwerty987', true, 'Penticton', 'BC', 'Canada' )
('Blasted Church Vineyards', 'bcvineyards@gmail.com', 'Qwerty987', true, 'Okanagan Falls', 'BC', 'Canada' )
('Road 13', 'road13@gmail.com', 'Qwerty987', true, 'Oliver', 'BC', 'Canada' )
('Quails Gate Estate Winery', 'qgewinery@gmail.com', 'Qwerty987', true, 'Kelowna', 'BC', 'Canada')
('Mission Hill Family Estate', 'mhfestate@gmail.com', 'Qwerty987', true, 'West Kelowna', 'BC', 'Canada' )
('Tom Smith', 'tomsmith@gmail.com', 'Qwerty987', false, 'Vancouver', 'BC', 'Canada' )

INSERT INTO wineListings (user_id, price, year, name, winery, award, type, descriptions, sold_out, imageUrl)
VALUES
(1, '22.00', '2021', 'La Frenz N/V Liqueur Muscat', 'La Frenz Estate Winery', 'NWAC21 Platinum', 'Fortified', '' , False, )
(1, '29.00', '2019', 'La Frenz 2019 Reserve Ensemble','La Frenz Estate Winery', 'NWAC21 Platinum', 'White', , False, )
(1, '32.00', '2019', 'La Frenz 2019 Reserve Chardonnay', 'La Frenz Estate Winery', 'NWAC21 Gold', 'White', , False, )
(1, '32.00', '2018', 'La Frenz Cabernets Rockyfeller Vineyard 2018', 'La Frenz Estate Winery', 'NWAC21 Gold', 'Red', , True, )
(1, '22.00', '2020', 'La Frenz Freedom 75 Vineyard Riesling 21b 2020', 'La Frenz Estate Winery', 'NWAC21 Gold', 'White', , False, )

(2, '24.00', '2019', 'Blasted Church Big Bang Theory 2019', 'Blasted Church Vineyards', 'NWAC21 Platinum', 'Red', , False, )
(2, '36.90', '2019', 'Blasted Church Cabernet Franc 2019', 'Blasted Church Vineyards', 'NWAC21 Platinum', 'White',  , True, )
(2, '75.00', '2017', 'Blasted Church Vineyards', 'Blasted Church Nectar Of The Gods 2017', 'NWAC21 Gold', 'Red', , False, )
(2, '36.90', '2018', 'Blasted Church Cabernet Merlot 2018','Blasted Church Vineyards', 'NWAC21 Gold', 'Red', , False, )
(2, '40.00', '2018', 'Blasted Church Small Blessings Malbec 2018', 'Blasted Church Vineyards', 'NWAC21 Gold', 'Red', , False, )

(3, '36.99', '2019', 'Road 13 Gsm 2019', 'Road 13', 'NWAC21 Platinum', 'Red', , False, )
(3, '34.99', '2019', 'Road 13 2019 Syrah Malbec', 'Road 13', 'NWAC21 Gold', 'Red', , False, )
(3, '23.99', '2020', 'Road 13 Vineyards Cabernet Merlot 2020', 'Road 13', 'NWAC21 Gold', 'Red', , False, )
(3, '64.99', '2019', 'Road 13 Jackpot Malbec 2019', 'Road 13', 'NWAC21 Gold', 'Red', , False, )
(3, '39.99', '2017', 'Road 13 Vineyards Sparkling Chenin Blanc 2017', 'Road 13', 'NWAC21 Silver', 'Red', , False, )

(4, '63.35', '2019', 'Quails Gate Rosémary Block Chardonnay 2019','Quails Gate Estate Winery', 'NWAC21 Platinum', 'White', , False, )
(4, '64.99', '2019', 'Quails Gate Richards Block Pinot Noir 2019', 'Quails Gate Estate Winery', 'NWAC21 Gold', 'White', , False, )
(4, '45.00', '2019', 'Quails Gate Stewart Family Reserve Chardonnay 2019', 'Quails Gate Estate Winery', 'NWAC21 Gold', 'White', , False, )
(4, '69.99', '2018', 'Quails Gate The Boswell Syrah 2018', 'Quails Gate Estate Winery', 'NWAC21 Gold', 'Red', , False, )
(4, '49.95', '2019', 'Quails Gate Queue 2019', 'Quails Gate Estate Winery', 'NWAC21 Silver', 'Red', , True, )

(5, '80.00', '2017', 'Mission Hill Legacy Collection Quatrain 2017', 'Mission Hill Family Estate', 'NWAC21 Platinum', 'Red', , False, )
(5, '65.00', '2019', 'Mission Hill Perpetua 2019', 'Mission Hill Family Estate', 'NWAC21 Gold', 'White', , False, )
(5, '60.00', '2019', 'Mission Hill Terroir Collection Vistas Edge Cabernet Franc 2019', 'Mission Hill Family Estate', 'NWAC21 Gold', 'White', , False, )
(5, '80.00', '2017', 'Mission Hill Legacy Collection Compendium 2017', 'Mission Hill Family Estate', 'NWAC21 Gold', 'Red', , False, )
(5, '22.95', '2020', 'Mission Hill Reserve Pinot Gris 2020', 'Mission Hill Family Estate', 'NWAC21 Gold', 'Red', , False, )

INSERT INTO favorites (user_id, listing_id) VALUES
(6, 5),
(6, 10),
(6, 15);

-- INSERT INTO messages (user_id, listing_id, created_at) VALUES



-- INSERT INTO messageListing (sender_id, message_id, messageText, timeSent) VALUES