---
layout: post
title: "Android AChartEngine"
tags: [AChartEngine]
categories: [Android]
---
{% include codepiano/setup %}

最近一段时间完成“体重记录”的功能，需要实现日历和曲线的效果。也花费不少精力吧，这里就先把曲线的实现分享出来，俗话说的好：“好记忆不如烂笔头”！

## AChartEngine是什么？

AChartEngine是一个android应用的图表库，他支持一些常见的一些图表，如线状图，区域图，散点图，时间图，柱状图，饼状图，气泡图等。当然这次只用到了线状图。项目地址在[http://code.google.com/p/achartengine/](http://code.google.com/p/achartengine/)

下面先看下这次项目中实现的效果吧：

<img src="/image/weight_curve.png">

## 实现

总的来说，AChartEngine提供的api还是很全的，使用起来是很方便的，但是唯一的缺点就是api文档描述的不够详细，很多自己想要的效果都只能自己根据api的命名去推测，更有甚者得必须自己亲自一点点尝试才能实现出自己想要的效果，为了以后用到，这次也在代码中用到的接口表明了清晰的注释，废话不多说，直接上代码。

{% highlight ruby %}
public class WeightCurveActivity extends ActivityBase {

	static final String TAG = WeightCurveActivity.class.getName();

	private LinearLayout rootLayout;
	private XYMultipleSeriesRenderer mRenderer;
	private XYMultipleSeriesDataset mDataset = new XYMultipleSeriesDataset();
	
	private int month;
	private Date date;
	private ArrayList<WeightRecord> records;
	private double[] xValues;
	private double[] yValues;

	public void onCreate(Bundle outState) {
		super.onCreate(outState);
		setContentView(R.layout.weight_curve);
		
		handleIntent();
		initRender();
		initData();
		initUI();
	}
	
	private void handleIntent() {
		String dateString = getIntent().getStringExtra(Const.DATE);
		date = DateHelper.parseString(dateString);
	}
	
	private void initRender() {
		mRenderer = buildRenderer();
		setChartSettings(0, 31, 30, 120);
	}
	
	private void initData() {
		month = DateHelper.getMonth(date);
		WeightRecordDao dao = new WeightRecordDao(this);
		records = dao.getMonthLists(date);
		Helper.showLog(TAG, records.size());
		dao.closeDB();
		initValues();
	}
	
	private void initValues() {
		int count = records.size();
		if (count > 0) {
			xValues = new double[count];
			yValues = new double[count];
			for (int i = 0; i < count; i ++) {
				WeightRecord record = records.get(i);
				xValues[i] = DateHelper.getDay(record.record_on);
				yValues[i] = (Math.round(record.weight * 10) / 10.0);
			}
			setXLabel();
		}
	}
	
	private void initUI() {
		addXYSeries(0);

		rootLayout = (LinearLayout) findViewById(R.id.root);
		View view = ChartFactory.getLineChartView(this, mDataset, mRenderer);
		rootLayout.addView(view);
	}
	
	private void setXLabel() {
		mRenderer.setXLabels(0); // 设置X轴标签不显示
		int length = xValues.length;
		for (int i = 0; i < length; i++) {
			mRenderer.addXTextLabel(i * 3 + 1, month + "/" + (int)xValues[i]);
		}
	}
	
	private XYMultipleSeriesRenderer buildRenderer() {
		XYMultipleSeriesRenderer renderer = new XYMultipleSeriesRenderer();
		renderer.setAxisTitleTextSize(16); // 设置坐标轴字体大小
		renderer.setChartTitleTextSize(20); // 设置标题大小
		renderer.setLabelsTextSize(20); // 设置标签字体大小
		renderer.setLegendTextSize(15); // 设置底部曲线说明字体大小
		renderer.setShowGridX(true); // 设置X方向表格显示
		renderer.setShowLegend(false); // 设置底部曲线说明显示
		renderer.setGridColor(Color.LTGRAY); // 设置表格颜色
		renderer.setPointSize(5f);
		renderer.setMargins(new int[] { 30, 40, 10, 30 });
		renderer.setPanEnabled(true, false); // 设置曲线可滑动

		renderer.setApplyBackgroundColor(true); // 设置图表背景
		renderer.setBackgroundColor(Color.TRANSPARENT);

		renderer.setChartTitle("体重曲线");
		renderer.setXTitle("日期");
		renderer.setYTitle("体重");

		renderer.setXLabelsColor(getResources().getColor(
				R.color.main_font_color));
		renderer.setXLabelsAlign(Align.CENTER);
		renderer.setXLabelsPadding(5);
		renderer.setYLabelsColor(0,
				getResources().getColor(R.color.main_font_color));
		renderer.setYLabelsPadding(5);
		renderer.setYLabelsAlign(Align.RIGHT);

		renderer.setAxesColor(Color.GRAY); // 设置坐标轴颜色
		renderer.setMarginsColor(getResources().getColor(R.color.main_bg_color)); // 设置图表周围颜色
		
		renderer.setLabelsColor(Color.GRAY); // 设置标签颜色
		
		XYSeriesRenderer r = new XYSeriesRenderer();
		r.setColor(getResources().getColor(R.color.stress_font_color));
		r.setFillPoints(true);
		r.setPointStyle(PointStyle.CIRCLE);
		renderer.addSeriesRenderer(r);
		r.setDisplayChartValues(true); // 设置显示图表值
		r.setDisplayChartValuesDistance(1);
		r.setChartValuesTextSize(16);
		r.setChartValuesSpacing(10);
		r.setHighlighted(true);
		return renderer;
	}

	private void setChartSettings(double xMin, double xMax, double yMin,
			double yMax) {
		mRenderer.setXAxisMin(xMin); // 设置X轴最小值
		mRenderer.setXAxisMax(xMax); // 设置X轴最大值
		mRenderer.setYAxisMin(yMin); // 设置Y轴最小值
		mRenderer.setYAxisMax(yMax); // 设置Y轴最大值
	}

	private void addXYSeries(int scale) {
		XYSeries series = new XYSeries("", scale);
		if (records.size() > 0) {
			int seriesLength = xValues.length;
			for (int k = 0; k < seriesLength; k++) {
				series.add(k * 3 + 1, yValues[k]);
			}
		}
		mDataset.addSeries(series);
	}
}
{% endhighlight %}

现在看来代码倒是很简单，但是为了实现现在这个样子，当初费了不少精力来一步步尝试。当然AChartEngine能实现的不止这些，可以充分发挥自己的想象力与创造力，实现更加复杂的效果与功能。