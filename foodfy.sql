--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: dimas
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_set_timestamp() OWNER TO dimas;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chefs; Type: TABLE; Schema: public; Owner: dimas
--

CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    file_id integer
);


ALTER TABLE public.chefs OWNER TO dimas;

--
-- Name: chefs_id_seq; Type: SEQUENCE; Schema: public; Owner: dimas
--

CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chefs_id_seq OWNER TO dimas;

--
-- Name: chefs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dimas
--

ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: dimas
--

CREATE TABLE public.files (
    id integer NOT NULL,
    filename text,
    path text NOT NULL
);


ALTER TABLE public.files OWNER TO dimas;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: dimas
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO dimas;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dimas
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: dimas
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    chef_id integer,
    title text NOT NULL,
    ingredients text[],
    preparations text[],
    informations text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    user_id integer
);


ALTER TABLE public.recipes OWNER TO dimas;

--
-- Name: recipes_files; Type: TABLE; Schema: public; Owner: dimas
--

CREATE TABLE public.recipes_files (
    id integer NOT NULL,
    recipes_id integer,
    files_id integer
);


ALTER TABLE public.recipes_files OWNER TO dimas;

--
-- Name: recipes_files_id_seq; Type: SEQUENCE; Schema: public; Owner: dimas
--

CREATE SEQUENCE public.recipes_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_files_id_seq OWNER TO dimas;

--
-- Name: recipes_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dimas
--

ALTER SEQUENCE public.recipes_files_id_seq OWNED BY public.recipes_files.id;


--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: dimas
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO dimas;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dimas
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: dimas
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO dimas;

--
-- Name: users; Type: TABLE; Schema: public; Owner: dimas
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    reset_token text,
    reset_token_experies text,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    update_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO dimas;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dimas
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO dimas;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dimas
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chefs id; Type: DEFAULT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: recipes_files id; Type: DEFAULT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes_files ALTER COLUMN id SET DEFAULT nextval('public.recipes_files_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: chefs; Type: TABLE DATA; Schema: public; Owner: dimas
--

COPY public.chefs (id, name, created_at, file_id) FROM stdin;
1	Jorge Relato	2020-11-13 00:00:00	247
4	Samanta Santos Kala	2020-11-20 00:00:00	248
5	Juliano Vieira	2020-11-20 00:00:00	249
6	Vania Steroski	2020-11-20 00:00:00	250
7	Ricardo Golvea	2020-11-20 00:00:00	251
8	Júlia Kinoto	2020-11-20 00:00:00	252
9	Joseph Gonzalez	2020-11-20 00:00:00	253
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: dimas
--

COPY public.files (id, filename, path) FROM stdin;
150	1609165543910-burger.png	public/images/1609165543910-burger.png
151	1609166689886-pizza.png	public/images/1609166689886-pizza.png
247	1610994755652-travis-grossen-AXDTTuh-0UI-unsplash.jpg	public/images/1610994755652-travis-grossen-AXDTTuh-0UI-unsplash.jpg
153	1609179384435-lasanha.png	public/images/1609179384435-lasanha.png
154	1609179403188-espaguete.png	public/images/1609179403188-espaguete.png
155	1609179422052-doce.png	public/images/1609179422052-doce.png
156	1609179917459-photo-1484723091739-30a097e8f929.jpeg	public/images/1609179917459-photo-1484723091739-30a097e8f929.jpeg
157	1609180004816-aliona-gumeniuk-pHDFgXWIOK0-unsplash.jpg	public/images/1609180004816-aliona-gumeniuk-pHDFgXWIOK0-unsplash.jpg
1	1608764087325-asinhas.png	public/images/1608764087325-asinhas.png
158	1609357087368-ivan-torres-MQUqbmszGGM-unsplash.jpg	public/images/1609357087368-ivan-torres-MQUqbmszGGM-unsplash.jpg
248	1610994970313-noah-buscher-NGm1m8u59uk-unsplash.jpg	public/images/1610994970313-noah-buscher-NGm1m8u59uk-unsplash.jpg
249	1610995150082-sanaea-sanjana-9ZStR5z3Miw-unsplash.jpg	public/images/1610995150082-sanaea-sanjana-9ZStR5z3Miw-unsplash.jpg
250	1610996780729-mathilde-langevin-1Co4wZ4nTDw-unsplash.jpg	public/images/1610996780729-mathilde-langevin-1Co4wZ4nTDw-unsplash.jpg
251	1610996863130-toa-heftiba-5JeTin55H9U-unsplash.jpg	public/images/1610996863130-toa-heftiba-5JeTin55H9U-unsplash.jpg
252	1610997033795-matt-seymour-UTCMrSyGHgY-unsplash.jpg	public/images/1610997033795-matt-seymour-UTCMrSyGHgY-unsplash.jpg
253	1610997703506-febrian-zakaria-SiQgni-cqFg-unsplash.jpg	public/images/1610997703506-febrian-zakaria-SiQgni-cqFg-unsplash.jpg
255	1617649315550-mafe-studio-LV2p9Utbkbw-unsplash.jpg	public/images/1617649315550-mafe-studio-LV2p9Utbkbw-unsplash.jpg
256	1617649435566-mafe-studio-LV2p9Utbkbw-unsplash.jpg	public/images/1617649435566-mafe-studio-LV2p9Utbkbw-unsplash.jpg
257	1617750444607-mgg-vitchakorn-J5ZivsKiu9c-unsplash.jpg	public/images/1617750444607-mgg-vitchakorn-J5ZivsKiu9c-unsplash.jpg
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: dimas
--

COPY public.recipes (id, chef_id, title, ingredients, preparations, informations, created_at, updated_at, user_id) FROM stdin;
2	1	Pizza Quatro Estações	{"1 ovo, 1 colher (chá) de sal, 1 colher (chá) de açúcar, 1 colher (sopa) de margarina, 1 e 1/2 xícara (chá) de farinha de trigo, 1 colher (sobremesa) de fermento em pó, 1/2 lata de molho de tomate, 250 g de mussarela ralada grossa, 2 tomates fatiados,azeitona picada,orégano a gosto. 1 xícara (chá) de leite."}	{"No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado. Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos. Retire do forno e despeje o molho de tomate. Cubra a massa com mussarela ralada, tomate e orégano a gosto. Leve novamente ao forno até derreter a mussarela."}	Pizza de liquidificador é uma receita deliciosa e supersimples de preparar. Feita toda no liquidificador, ela é bem prática para o dia a dia. Aqui no Tudo Gostoso você também encontra diversas delícias práticas feitas no liquidificador: massa de panqueca, torta de frango de liquidificador, pão de queijo de liquidificador, bolo de banana, bolo de chocolate e muito mais!	2020-11-16 00:00:00	2021-01-24 16:56:52.96666	\N
21	7	Docinhos pão-do-céu	{"1 kg de batata - doce,100 g de manteiga,3 ovos,1 pacote de coco seco ralado (100 g),3 colheres (sopa) de açúcar 1 lata de Leite Moça,1 colher (sopa) de fermento em pó,manteiga para untar,açúcar de confeiteiro"}	{"Cozinhe a batata-doce numa panela de pressão, com meio litro de água, por cerca de 20 minutos. Descasque e passe pelo espremedor, ainda quente.,Junte a manteiga,os ovos, o coco ralado,o açúcar, o Leite Moça e o fermento em pó, mexendo bem após cada adição.,Despeje em assadeira retangular média, untada e leve ao forno médio (180°C), por aproximadamente 45 minutos. Depois de frio, polvilhe, com o,açúcar de confeiteiro e corte em quadrados."}	'	2020-11-24 00:00:00	2021-01-24 16:54:59.416558	\N
22	9	Sanduíche Banaúva	{"1 cacho com uvas,1 dúzia de bananas nanicas,1 pacote de pão de forma,200g de coco ralado,1 frasco de mel puro."}	{"Lave as uvas e separe-as do cacho,Descasque uma banana e fatie em rodelas,Espalhe o mel em duas fatias de pão,Cubra as fatias com algumas rodelas de banana e algumas uvas,Feche as fatias para formar um sanduíche,Coloque o sanduíche em cima de um prato limpo, e salpique o coco ralado em cima, e ao redor do sanduíche."}	    Delícia!	2020-11-24 00:00:00	2021-01-24 16:57:19.184684	\N
23	4	Sorvete de Amora	{"1 Kg de Amoras vermelhas,1 L de Leite (tipo de sua preferência),1 lata de leite condensado.,"}	{"Lave as amoras e coloque no liquidificador,Coloque 2 xícaras de leite no liquidificador,Coloque 1 xícara de leite condensado."}	Bata os ingredientes no liquidificador até ficar cremoso. \r\nSe necessário adicione mais leite e/ou leite condensado. Coloque para congelar no freezer com o molde de sua preferência.	2020-11-24 00:00:00	2021-01-24 16:57:38.705319	\N
20	8	Espaguete ao alho	{"1 pacote de macarrão 500 g (tipo do macarrão a gosto),1 saquinho de alho granulado,1/2 tablete de manteiga (não use margarina),1 colher (sopa) de azeite extra virgem,ervas (manjericão, orégano, salsa, cebolinha, tomilho, a gosto),sal,1 dente de alho,gengibre em pó a gosto,1 folha de louro"}	{"Quando faltar mais ou menos 5 minutos para ficar no ponto de escorrer o macarrão, comece o preparo da receita.,Na frigideira quente coloque a manteiga, o azeite, a folha de louro, e o alho granulado.,Nesta hora um pouco de agilidade, pois o macarrão escorrido vai para a frigideira, sendo mexido e dosado com sal a gosto, as ervas, o gengibre em pó a gosto também.,O dente de alho, serve para você untar os pratos onde serão servidos o macarrão.,Coloque as porções nos pratos já com o cheiro do alho, e enfeite com algumas ervas."}	Não lave o macarrão nem passe óleo ou gordura nele depois de escorrê-lo. \r\nColoque direto na frigideira.	2020-11-24 00:00:00	2021-01-24 16:55:14.368438	\N
1	1	Triplo Bacon Burger	{"3 kg de carne moída (escolha uma carne magra e macia),300 g de bacon moído,1 ovo,3 colheres (sopa) de farinha de trigo,3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador,30 ml de água gelada"}	{"Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.,Faça porções de 90 g a 100 g.,Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.,Faça um de cada vez e retire o aro logo em seguida.,Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).,Faça no máximo 4 camadas por forma e leve para congelar.,Retire do congelador, frite ou asse e está pronto."}	Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres! Você sabia que a receita que precede o hambúrguer surgiu no século XIII, na Europa? A ideia de moer a carne chegou em Hamburgo no século XVII, onde um açogueiro resolveu também temperá-la. Assim, a receita foi disseminada nos Estados Unidos por alemães da região. Lá surgiu a ideia de colocar o hambúrguer no meio do pão e adicionar outros ingredientes, como queijom tomates e alface.	2020-11-13 00:00:00	2021-04-05 16:03:55.608392	\N
19	5	Lasanha mac n' cheese	{"massa pronta de lasanha,400 g de presunto,400 g de mussarela ralada,2 copos de requeijão,150 g de mussarela para gratinar"}	{"Em uma panela, coloque a manteiga para derreter. Acrescente a farinha de trigo e misture bem com auxílio de um fouet.,Adicione o leite e misture até formar um creme homogêneo.,Tempere com sal, pimenta e noz-moscada a gosto.,Desligue o fogo e acrescente o creme de leite; misture bem e reserve."}	Recheie a lasanha com o que preferir.	2020-11-24 00:00:00	2021-01-24 16:55:58.184213	\N
3	9	Asinhas de frango ao berbecue	{"12 encontros de asinha de galinha,temperados a gosto,2 colheres de sopa de farinha de trigo,1/2 xícara (chá) de óleo,1 xícara de molho barbecue"}	{"Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos.,Em uma frigideira ou assador coloque o óleo quando estiver quente frite até ficarem douradas.,Para servir fica bonito com salada,ou abuse da criatividade."}	Lembrar de desligar o gás.	2020-11-16 00:00:00	2021-04-06 20:52:18.41792	\N
\.


--
-- Data for Name: recipes_files; Type: TABLE DATA; Schema: public; Owner: dimas
--

COPY public.recipes_files (id, recipes_id, files_id) FROM stdin;
1	3	1
2	1	150
13	2	151
15	19	153
16	20	154
17	21	155
18	22	156
19	23	157
20	2	158
21	1	256
22	3	257
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: dimas
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dimas
--

COPY public.users (id, name, email, password, reset_token, reset_token_experies, is_admin, created_at, update_at) FROM stdin;
3	Jose Alantes	jose@alantes.com	$2a$08$lZUcYviDKNkymuTRxBFpBeP86BL139ujFW9PFy.uRd7A7n1R6rn5K	\N	\N	f	2021-02-25 14:22:29.151974	2021-02-25 14:22:29.151974
5	Saka Fabakato	saka@faba.com.br	$2a$08$ELlRFpxkYbrQFKXU1SF6IubOaPTZSsQaK9gR9HnulixLU.qI8/ATC	\N	\N	f	2021-02-27 17:02:35.051813	2021-02-27 17:02:35.051813
7	Samanta Santos Kala	samanta@santokala.com.br	$2a$08$IY0At2XEukWknLDkKsROJeNHe9Lv7P/9Ipj3v6mOQ7.aAA4kUNnnC	\N	\N	f	2021-02-27 17:04:09.705057	2021-02-27 17:04:09.705057
8	Juliano Vieira	julianovieira@gmail.br	$2a$08$SczERwqj33UERdxANsmmQu6fjGyKySSalFyTlNeCYpLPxmZsgxtV6	\N	\N	f	2021-02-27 17:04:58.573074	2021-02-27 17:04:58.573074
9	Ricardo Golvea	ricardogo@golvea.br	$2a$08$fg.k1LXqNY/PuVKfA36GqOwz88eFptx/5jkpW7E1/altR/CaWJFIm	\N	\N	f	2021-02-27 17:05:41.960933	2021-02-27 17:05:41.960933
10	Pacus Alves Souza	palvesouza@hotmail.com	$2a$08$9NLGMUKigA/HzOGzH4KEG.sFfp4fumtYohcREsBTxDaj5tbxVRtcC	\N	\N	f	2021-04-02 14:11:56.630481	2021-04-02 14:11:56.630481
4	Sava Sarana	savasarana@saara.com	$2a$08$OVKw7QmcxVbwZViQaZxGV./eshh78z2T3shQWrUNz0LjHMHXIJjiW	\N	\N	t	2021-02-27 17:01:22.211311	2021-02-27 17:01:22.211311
6	Vania Steroski	vaniso@gmail.com	$2a$08$ftzysIz95h/1J3HDfnj0juFQiVTAB7X1gono/Dn2DMzqrNjVwidh6	\N	\N	t	2021-02-27 17:03:26.64959	2021-02-27 17:03:26.64959
2	Dimas Alves Pereira	dimasalquimista@gmail.com	$2a$08$HOYiOHnKAbMdUhMbOTAhfuPQ0CCtV5TfmpFoItAe3UPSh.NniMMre	\N	\N	t	2021-02-15 14:46:13.667736	2021-02-15 14:46:13.667736
\.


--
-- Name: chefs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dimas
--

SELECT pg_catalog.setval('public.chefs_id_seq', 34, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dimas
--

SELECT pg_catalog.setval('public.files_id_seq', 257, true);


--
-- Name: recipes_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dimas
--

SELECT pg_catalog.setval('public.recipes_files_id_seq', 22, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dimas
--

SELECT pg_catalog.setval('public.recipes_id_seq', 140, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dimas
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: chefs chefs_pkey; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: recipes_files recipes_files_pkey; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes_files
    ADD CONSTRAINT recipes_files_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: dimas
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: recipes set_timestamp; Type: TRIGGER; Schema: public; Owner: dimas
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.recipes FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: chefs chefs_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id);


--
-- Name: recipes recipes_chef_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_chef_id_fkey FOREIGN KEY (chef_id) REFERENCES public.chefs(id);


--
-- Name: recipes_files recipes_files_files_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes_files
    ADD CONSTRAINT recipes_files_files_id_fkey FOREIGN KEY (files_id) REFERENCES public.files(id);


--
-- Name: recipes_files recipes_files_recipes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes_files
    ADD CONSTRAINT recipes_files_recipes_id_fkey FOREIGN KEY (recipes_id) REFERENCES public.recipes(id);


--
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dimas
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

